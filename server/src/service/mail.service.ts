import * as nodemailer from "nodemailer";
import SMTPTransport = require("nodemailer/lib/smtp-transport");
export class MailService {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT) || 0,
      secure: false,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASSWORD!,
      },
    });
  }
  async sendActivationMail(to: string, link: string) {}
}
