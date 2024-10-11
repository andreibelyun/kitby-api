import dotenv from "dotenv";
import nodemailer, { Transporter } from "nodemailer";
import { MailMessage } from "../types";

dotenv.config();

const {
  EMAIL_SERVICE,
  EMAIL_HOST,
  EMAIL_HOST_PASSWORD,
  EMAIL_HOST_USER,
  EMAIL_PORT,
  SITE_NAME,
} = process.env;

class Mail {
  transporter: Transporter;

  constructor() {
    this.transporter = this.getTransporter();
  }

  getTransporter(): Transporter {
    return nodemailer.createTransport({
      service: EMAIL_SERVICE,
      host: EMAIL_HOST,
      port: parseInt(EMAIL_PORT, 10),
      secure: true,
      auth: {
        user: EMAIL_HOST_USER,
        pass: EMAIL_HOST_PASSWORD,
      },
    });
  }

  async sendMail(message: MailMessage): Promise<any> {
    try {
      const { subject, text, html } = message;

      const mailOptions = {
        from: `Отправлено c сайта ${SITE_NAME} <${EMAIL_HOST_USER}>`,
        to: EMAIL_HOST_USER,
        subject: subject,
        text: text,
        html: html,
      };

      const info = await this.transporter.sendMail(mailOptions);

      return info;
    } catch (err) {
      return err;
    }
  }
}

export default new Mail();
