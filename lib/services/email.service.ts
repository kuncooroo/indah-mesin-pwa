import nodemailer from "nodemailer";

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendEmail(input: SendEmailInput): Promise<boolean> {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;

  if (!transporter || !from) {
    console.warn("[email] SMTP not configured, skipping:", input.subject);
    return false;
  }

  try {
    await transporter.sendMail({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text ?? input.subject,
    });
    return true;
  } catch (error) {
    console.error("[email] send failed:", error);
    return false;
  }
}

export async function sendWelcomeEmail(to: string, name: string) {
  return sendEmail({
    to,
    subject: "Selamat datang di IndustrialX",
    html: `<p>Halo <strong>${name}</strong>,</p><p>Akun Anda berhasil dibuat. Selamat berbelanja mesin industri di IndustrialX Marketplace.</p>`,
  });
}

export async function sendRfqSubmittedEmail(input: {
  to: string;
  name: string;
  rfqNumber: string;
}) {
  return sendEmail({
    to: input.to,
    subject: `RFQ ${input.rfqNumber} berhasil dikirim`,
    html: `<p>Halo <strong>${input.name}</strong>,</p><p>Permintaan penawaran <strong>${input.rfqNumber}</strong> telah kami terima. Tim sales akan menghubungi Anda segera.</p>`,
  });
}

export async function sendNotificationEmail(input: {
  to: string;
  title: string;
  message: string;
}) {
  return sendEmail({
    to: input.to,
    subject: input.title,
    html: `<p><strong>${input.title}</strong></p><p>${input.message}</p>`,
  });
}
