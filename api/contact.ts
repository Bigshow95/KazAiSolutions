
// Vercel Serverless Function: /api/contact
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  const { name, email, phone, message, token } = req.body || {};

  // Basic validation
  if (!name || !email || !message) return res.status(400).json({ ok: false, error: 'Missing fields' });

  // Simple rate limit via header (Vercel edge/CDN often sets x-real-ip)
  const ip = (req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '') as string;

  // Verify reCAPTCHA v3 if configured
  try {
    const secret = process.env.RECAPTCHA_SECRET;
    if (secret && token) {
      const params = new URLSearchParams({ secret, response: token });
      const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
      const data = await resp.json();
      if (!data.success || (typeof data.score === 'number' && data.score < 0.5)) {
        return res.status(400).json({ ok: false, error: 'reCAPTCHA failed' });
      }
    }
  } catch (e) {
    // Continue without strict failure
  }

  // Honeypot check (should be done client-side too)
  if ((req.body?.company || '').toString().trim().length > 0) {
    return res.status(200).json({ ok: true }); // silently ignore bots
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.CONTACT_TO || 'kz.ai.solutions@gmail.com';
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\n\nMessage:\n${message}\n\nIP: ${ip}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
}