import { prisma } from "@/lib/db/prisma";
import type { NotificationType } from "@/lib/generated/prisma/client";
import { sendNotificationEmail, sendRfqSubmittedEmail, sendWelcomeEmail } from "@/lib/services/email.service";

export const notificationService = {
  async create(input: {
    customerId?: string | null;
    email?: string | null;
    type: NotificationType;
    title: string;
    message: string;
    sendEmail?: boolean;
  }) {
    const notification = await prisma.notification.create({
      data: {
        customerId: input.customerId ?? null,
        email: input.email ?? null,
        type: input.type,
        title: input.title,
        message: input.message,
      },
    });

    let sentEmail = false;

    if (input.sendEmail !== false && input.email) {
      sentEmail = await sendNotificationEmail({
        to: input.email,
        title: input.title,
        message: input.message,
      });

      if (sentEmail) {
        await prisma.notification.update({
          where: { id: notification.id },
          data: { sentEmail: true },
        });
      }
    }

    return { ...notification, sentEmail };
  },

  async listForCustomer(customerId: string) {
    return prisma.notification.findMany({
      where: { customerId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  },

  async markRead(id: string, customerId: string) {
    return prisma.notification.updateMany({
      where: { id, customerId },
      data: { isRead: true },
    });
  },

  async notifyWelcome(customerId: string, email: string, name: string) {
    const title = "Selamat datang di IndustrialX";
    const message =
      "Akun Anda berhasil dibuat. Jelajahi katalog mesin industri kami.";

    const sentEmail = await sendWelcomeEmail(email, name);

    return prisma.notification.create({
      data: {
        customerId,
        email,
        type: "WELCOME",
        title,
        message,
        sentEmail,
      },
    });
  },

  async notifyRfqSubmitted(input: {
    customerId?: string | null;
    email: string;
    name: string;
    rfqNumber: string;
  }) {
    const title = `RFQ ${input.rfqNumber} terkirim`;
    const message =
      "Permintaan penawaran Anda telah diterima tim IndustrialX.";

    const sentEmail = await sendRfqSubmittedEmail({
      to: input.email,
      name: input.name,
      rfqNumber: input.rfqNumber,
    });

    return prisma.notification.create({
      data: {
        customerId: input.customerId ?? null,
        email: input.email,
        type: "RFQ_SUBMITTED",
        title,
        message,
        sentEmail,
      },
    });
  },
};
