const express = require('express');
const { sendMail } = require('../utils/mailer');

const router = express.Router();

const VALID_SERVICES = [
  'Web Design & Development',
  'E-commerce Development',
  'Graphic Design',
  'Software Development',
  'Social Media & Automation',
  'Other / Not Sure Yet',
];

const VALID_BUDGETS = [
  'Under GHS 2,500',
  'GHS 2,500 – 5,000',
  'GHS 5,000 – 9,500',
  'GHS 9,500 – 20,000',
  'Over GHS 20,000',
  "Let's discuss",
];

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, budget, preferredDate, notes } = req.body;

    // Validation
    if (!name || !email || !phone || !service || !budget) {
      return res.status(400).json({ ok: false, message: 'Please fill in all required fields.' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ ok: false, message: 'Invalid email address.' });
    }

    if (!VALID_SERVICES.includes(service)) {
      return res.status(400).json({ ok: false, message: 'Invalid service selection.' });
    }

    if (!VALID_BUDGETS.includes(budget)) {
      return res.status(400).json({ ok: false, message: 'Invalid budget selection.' });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: #000; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: #c9a96e; margin: 0; font-size: 24px; letter-spacing: 4px;">LISGRAPHIX</h1>
          <p style="color: #888; margin: 4px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">New Booking Request</p>
        </div>
        <div style="background: #fff; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
          <h2 style="color: #111; margin-top: 0; font-size: 20px;">New Project Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 12px; background: #f5f5f5; font-weight: bold; width: 140px;">Name</td>
              <td style="padding: 10px 12px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f0f0f0; font-weight: bold;">Email</td>
              <td style="padding: 10px 12px;"><a href="mailto:${email}" style="color: #c9a96e;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f5f5f5; font-weight: bold;">Phone / WA</td>
              <td style="padding: 10px 12px;"><a href="https://wa.me/${phone.replace(/\D/g, '')}" style="color: #c9a96e;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f0f0f0; font-weight: bold;">Service</td>
              <td style="padding: 10px 12px;"><strong style="color: #c9a96e;">${service}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f5f5f5; font-weight: bold;">Budget</td>
              <td style="padding: 10px 12px;">${budget}</td>
            </tr>
            ${preferredDate ? `
            <tr>
              <td style="padding: 10px 12px; background: #f0f0f0; font-weight: bold;">Preferred Start</td>
              <td style="padding: 10px 12px;">${preferredDate}</td>
            </tr>` : ''}
          </table>
          ${notes ? `
          <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; border-left: 4px solid #c9a96e; margin-bottom: 16px;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #111;">Project Notes:</p>
            <p style="margin: 0; color: #333; line-height: 1.6;">${notes.replace(/\n/g, '<br>')}</p>
          </div>` : ''}
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e5e5; color: #999; font-size: 12px;">
            Sent from lisgraphix.com booking form · ${new Date().toLocaleString('en-GB', { timeZone: 'Africa/Accra' })} (Ghana time)
          </div>
        </div>
      </div>
    `;

    await sendMail({
      subject: `[Booking Request] ${service} — ${name}`,
      html,
      replyTo: `${name} <${email}>`,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error('Booking route error:', error);
    return res.status(500).json({ ok: false, message: 'Failed to send booking request. Please try again or contact us via WhatsApp.' });
  }
});

module.exports = router;
