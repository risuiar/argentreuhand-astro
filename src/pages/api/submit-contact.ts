import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, type, message, language } = body;

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

    // Send email notification via Resend
    const resendApiKey = import.meta.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
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

        const emailTo = import.meta.env.CONTACT_EMAIL_TO || "info@argentatreuhand.com";
        const emailFrom = import.meta.env.CONTACT_EMAIL_FROM || "Argenta Treuhand <onboarding@resend.dev>";

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: emailFrom,
            to: [emailTo],
            subject: `Nuevo contacto: ${name} (${type})`,
            html: emailHtml,
          }),
        });
        console.log("Email notification sent successfully");
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
        // We don't return error here because Strapi already saved the contact
      }
    } else {
      console.warn("RESEND_API_KEY not configured, skipping email notification");
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
