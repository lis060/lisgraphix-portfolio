const express = require('express');
const { sendMail } = require('../utils/mailer');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, website } = req.body;

    // Honeypot check
    if (website && website.trim() !== '') {
      return res.status(200).json({ ok: true }); // Silently reject bots
    }

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ ok: false, message: 'All required fields must be filled.' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ ok: false, message: 'Invalid email address.' });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({ ok: false, message: 'Message is too short.' });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: #000; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: #c9a96e; margin: 0; font-size: 24px; letter-spacing: 4px;">LISGRAPHIX</h1>
          <p style="color: #666; margin: 4px 0 0; font-size: 12px;">New Contact Message</p>
        </div>
        <div style="background: #fff; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
          <h2 style="color: #111; margin-top: 0;">${subject}</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; width: 120px; border-radius: 4px;">Name</td>
              <td style="padding: 8px 12px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border-radius: 4px;">Email</td>
              <td style="padding: 8px 12px;"><a href="mailto:${email}" style="color: #c9a96e;">${email}</a></td>
            </tr>
          </table>
          <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; border-left: 4px solid #c9a96e;">
            <p style="margin: 0; color: #333; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e5e5; color: #999; font-size: 12px;">
            Sent from lisgraphix.com contact form
          </div>
        </div>
      </div>
    `;

    await sendMail({
      subject: `[Lisgraphix Contact] ${subject}`,
      html,
      replyTo: `${name} <${email}>`,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error('Contact route error:', error);
    return res.status(500).json({ ok: false, message: 'Failed to send message. Please try again or contact us via WhatsApp.' });
  }
});

module.exports = router;
