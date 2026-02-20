import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import nodemailer from "nodemailer";

export const server = {
  sendContactEmail: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      message: z.string(),
    }),
    handler: async (input) => {
      const transporter = nodemailer.createTransport({
        host: import.meta.env.ZOHO_HOST || "smtp.zoho.eu",
        port: Number(import.meta.env.ZOHO_PORT) || 465,
        secure: true,
        auth: {
          user: import.meta.env.ZOHO_USER,
          pass: import.meta.env.ZOHO_PASS,
        },
      });

      try {
        await transporter.sendMail({
          from: `"Web-Benutzer" <${import.meta.env.ZOHO_USER}>`,
          replyTo: input.email,
          to: import.meta.env.ZOHO_USER,
          subject: `Nachricht von ${input.name}`,
          text: input.message,
          html: `<b>Name:</b> ${input.name}<br>
                 <b>E-Mail:</b> ${input.email}<br>
                 <b>Nachricht:</b> ${input.message}`,
        });
        return { success: true };
      } catch (error) {
        console.error("Fehler beim Senden:", error);
        throw new Error("E-Mail konnte nicht gesendet werden.");
      }
    },
  }),
};
