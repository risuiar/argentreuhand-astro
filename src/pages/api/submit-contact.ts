import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, type, message, language, website } = body;

    // 1. Honeypot check for spam bots
    if (website) {
      console.warn("Spam detected: Honeypot field filled by bot");
      // Return a fake success to fool the bot
      return new Response(
        JSON.stringify({
          success: true,
          message: "Contact form submitted successfully",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Name, email, and message are required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid email format",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Prepare data for Strapi
    const contactData = {
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || "",
        type: type?.trim() || "general",
        message: message.trim(),
        language: language || "es",
      },
    };

    // Get Strapi URL from environment
    const strapiUrl = import.meta.env.VITE_CMS_URL;
    const strapiToken = import.meta.env.CMS_BEARER_TOKEN;

    console.log("Strapi URL:", strapiUrl);
    console.log("Strapi Token exists:", !!strapiToken);

    if (!strapiToken) {
      console.error("CMS_BEARER_TOKEN not configured");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Server configuration error",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Submit to Strapi
    const response = await fetch(`${strapiUrl}/api/arg-contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Strapi API error:", response.status, errorData);

      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to submit contact form",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Send email notification via Nodemailer (Zoho SMTP)
    const zohoUser = import.meta.env.ZOHO_USER;
    const zohoPass = import.meta.env.ZOHO_PASS;
    const zohoHost = import.meta.env.ZOHO_HOST?.replace("ssl://", "").replace("https://", "");
    const zohoPort = import.meta.env.ZOHO_PORT;

    if (zohoUser && zohoPass) {
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.createTransport({
          host: zohoHost || "smtp.zoho.eu",
          port: Number(zohoPort) || 465,
          secure: true, // Use SSL
          auth: {
            user: zohoUser,
            pass: zohoPass,
          },
          // Additional logging/debugging can be added here
        });

        const emailHtml = `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
          <p><strong>Asunto:</strong> ${type}</p>
          <p><strong>Idioma:</strong> ${language}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        `;

        await transporter.sendMail({
          from: `"Argenta Treuhand" <${zohoUser}>`,
          replyTo: email,
          to: zohoUser,
          subject: `Nuevo contacto: ${name} (${type})`,
          html: emailHtml,
        });

        console.log("Email notification sent successfully via Zoho");
      } catch (emailError) {
        console.error("Error sending email notification via Zoho:", emailError);
      }
    } else {
      console.warn("Zoho SMTP credentials not configured, skipping email notification");
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact form submitted successfully",
        data: result,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
