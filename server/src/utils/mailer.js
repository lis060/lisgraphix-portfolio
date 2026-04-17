const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

/**
 * @param {{ subject: string, html: string, replyTo?: string }} options
 */
async function sendMail({ subject, html, replyTo }) {
  const t = getTransporter();

  const mailOptions = {
    from: process.env.MAIL_FROM || 'Lisgraphix Website <noreply@lisgraphix.com>',
    to: process.env.MAIL_TO || 'lisgraphix17@gmail.com',
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  };

  return t.sendMail(mailOptions);
}

module.exports = { sendMail };
