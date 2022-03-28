import nodemailer from "nodemailer";

class EmailService {
  async sendActivationUserEmail(to, link) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта ${to}`,
      text: "",
      html: `
      <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
      </div>
      `,
    });
  }
}

export default new EmailService();
