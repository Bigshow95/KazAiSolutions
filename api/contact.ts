// /api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

async function verifyRecaptcha(token?: string) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) {
    console.warn('RECAPTCHA_SECRET not set – skipping verification (NOT recommended in prod)');
    return true;
  }
  if (!token) return false;

  const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`
  });
  const data = await resp.json();
  if (!data?.success) {
    console.error('reCAPTCHA failed:', data);
    return false;
  }
  if (typeof data.score === 'number' && data.score < 0.3) {
    console.error('reCAPTCHA low score:', data.score);
    return false;
  }
  return true;
}

function createTransport() {
  const mode = process.env.SMTP_MODE || 'service';

  if (mode === 'service') {
    // Вариант A: Gmail через service
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // Вариант B: Явный host/port
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  try {
    const { name, email, phone, businessLink, message, token } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'missing_fields' });
    }

    const captcha = await verifyRecaptcha(token).catch((e) => {
      console.error('verifyRecaptcha error:', e);
      return false;
    });
    if (!captcha) {
      return res.status(400).json({ ok: false, error: 'recaptcha_failed' });
    }

    // SMTP sanity checks
    const required = ['SMTP_USER', 'SMTP_PASS'];
    const missing = required.filter(k => !process.env[k]);
    if (missing.length) {
      console.error('Missing SMTP env:', missing);
      return res.status(500).json({ ok: false, error: 'smtp_env_missing' });
    }

    const transporter = createTransport();

    // Проверка соединения (очень полезно в логах)
    try {
      await transporter.verify();
      console.log('SMTP verified OK');
    } catch (e: any) {
      console.error('SMTP verify failed:', e?.message || e);
      return res.status(500).json({ ok: false, error: 'smtp_verify_failed' });
    }

    const to = process.env.CONTACT_TO || process.env.SMTP_USER!;
    const from = process.env.SMTP_FROM || process.env.SMTP_USER!;

    const subject = `New contact form: ${name}`;
    const text = `
Name: ${name}
Email: ${email}
Phone: ${phone || '-'}
Business: ${businessLink || '-'}
Message:
${message}
`.trim();

    try {
      await transporter.sendMail({
        from,
        to,
        subject,
        replyTo: email,
        text,
        html: text.replace(/\n/g, '<br/>')
      });
      console.log('Mail sent to', to);
    } catch (e: any) {
      console.error('sendMail failed:', e?.message || e);
      return res.status(500).json({ ok: false, error: 'smtp_send_failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    console.error('handler fatal:', e?.message || e);
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
}
