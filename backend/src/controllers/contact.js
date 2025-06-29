
import { createTransport } from 'nodemailer';
import { configurations } from '../config/config';

export const contactUs =  async (req, res) => {
    const { name, email, company, message } = req.body;
    try {
      const transporter = createTransport({
        service: 'gmail',
        auth: {
          user: configurations.adminEmail,
          pass: configurations.adminEmailPassword,
        },
      });
      await transporter.sendMail({
        from: email,
        to: configurations.adminEmail,
        subject: `Contact Form Submission from ${name}`,
        text: `Company: ${company || 'N/A'}\nMessage: ${message}`,
      });
      res.status(200).json({ message: 'Message sent to admin.' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to send email', error: err.message });
    }
  }