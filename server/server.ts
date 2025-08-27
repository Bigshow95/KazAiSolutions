
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 per minute per IP
});
app.use('/api/', limiter);

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message, token, company } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ ok: false, error: 'Missing fields' });
  if ((company || '').toString().trim().length > 0) return res.status(200).json({ ok: true });

  try {
    if (process.env.RECAPTCHA_SECRET && token) {
      const params = new URLSearchParams({ secret: process.env.RECAPTCHA_SECRET!, response: token });
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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const to = process.env.CONTACT_TO || 'kz.ai.solutions@gmail.com';
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\n\nMessage:\n${message}`,
    });

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
});

const port = Number(process.env.PORT || 5174);
app.listen(port, () => console.log(`[server] Listening on http://localhost:${port}`));
