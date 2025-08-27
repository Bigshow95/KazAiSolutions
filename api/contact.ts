// /api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

async function verifyRecaptcha(token?: string) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return true; // на всякий случай, чтобы не падало, но лучше задать секрет
  if (!token) return false;

  const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`
  });
  const data = await resp.json();
  // v3: success && score >= 0.3
  return !!(data?.success && (data?.score ?? 0) >= 0.3);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, businessLink, message, token } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'missing_fields' });
    }

    const recaptchaOk = await verifyRecaptcha(token).catch(() => false);
    if (!recaptchaOk) {
      return res.status(400).json({ ok: false, error: 'recaptcha_failed' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const to = process.env.CONTACT_TO || process.env.SMTP_USER;
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    const subject = `New contact form: ${name}`;
    const text = `
Name: ${name}
Email: ${email}
Phone: ${phone || '-'}
Business: ${businessLink || '-'}
Message:
${message}
`.trim();

    await transporter.sendMail({
      from,
      to,
      subject,
      replyTo: email,
      text,
      html: text.replace(/\n/g, '<br/>')
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
}
