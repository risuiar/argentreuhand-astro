// Fallback data for when CMS is unavailable
export const fallbackHomeData = {
  es: {
    id: 1,
    documentId: "fallback-home-es",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    locale: "es",
    hero: {
      title: "Asesoría Fiscal Profesional",
      subtitle:
        "Soluciones fiscales y empresariales integrales para hacer crecer tu negocio",
      description:
        "Somos expertos en consultoría fiscal y empresarial, ayudando a empresas y particulares a optimizar sus impuestos y gestionar sus negocios de manera eficiente.",
      ctaText: "Consulta Gratuita",
      ctaLink: "/reservar/",
      image: {
        url: "/argentatreuhand-logo.png",
        alternativeText: "Argenta Treuhand Logo",
      },
    },
    slider: {
      title: "Nuestros Servicios",
      subtitle: "Soluciones integrales para tu negocio",
      slides: [
        {
          id: 1,
          order: 1,
          title: "Asesoría Fiscal Profesional",
          subtitle: "Optimiza tus impuestos con expertos",
          image: [
            {
              url: "/argentatreuhand-logo.png",
              alternativeText: "Asesoría Fiscal",
            },
          ],
        },
        {
          id: 2,
          order: 2,
          title: "Constitución de Empresas",
          subtitle: "Te acompañamos en todo el proceso",
          image: [
            {
              url: "/argentatreuhand-logo.png",
              alternativeText: "Constitución de Empresas",
            },
          ],
        },
      ],
    },
    services: {
      id: 1,
      title: "Nuestros Servicios",
      description: "Soluciones fiscales y empresariales integrales",
      service: [
        {
          id: 1,
          title: "Declaración de Impuestos",
          description: "Preparación y presentación de declaraciones fiscales",
          icon: "lucide-calculator",
          feature: [
            { id: 1, name: "Declaración de la renta" },
            { id: 2, name: "IVA trimestral" },
            { id: 3, name: "Impuesto de sociedades" },
          ],
        },
        {
          id: 2,
          title: "Constitución de Empresas",
          description: "Te acompañamos en todo el proceso de creación",
          icon: "lucide-building",
          feature: [
            { id: 4, name: "Elección de forma jurídica" },
            { id: 5, name: "Registro mercantil" },
            { id: 6, name: "Trámites fiscales" },
          ],
        },
      ],
    },
    whyChooseUs: {
      id: 1,
      sectionTitle: "¿Por Qué Elegirnos?",
      description: "Somos más que una consultoría fiscal",
      why_point: [
        {
          id: 1,
          title: "Experiencia Certificada",
          text: "Más de 15 años de experiencia en consultoría fiscal",
          icon: "lucide-award",
        },
        {
          id: 2,
          title: "Respuesta Rápida",
          text: "Respuesta en menos de 24 horas a todas tus consultas",
          icon: "lucide-clock",
        },
      ],
    },
    testimonials: {
      id: 1,
      title: "Lo Que Dicen Nuestros Clientes",
      description:
        "La confianza de nuestros clientes es nuestra mejor recomendación",
      testimonialItem: [
        {
          id: 1,
          name: "Mario González",
          position: "CEO, TechStart Berlin",
          quote:
            "Argenta Treuhand nos ayudó a constituir nuestra empresa y optimizar nuestros impuestos desde el primer día.",
          photo: {
            url: "/argentatreuhand-logo.png",
            alternativeText: "Mario González",
          },
        },
      ],
    },
    contact: {
      id: 1,
      title: "Información de Contacto",
      contacts: [
        {
          id: 1,
          title: "Teléfono",
          content: "+41 44 123 45 67",
          icon: "lucide-phone",
        },
        {
          id: 2,
          title: "Email",
          content: "info@argentatreuhand.com",
          icon: "lucide-mail",
        },
        {
          id: 3,
          title: "Dirección",
          content: "Bahnhofstrasse 123 8001 Zürich, Schweiz",
          icon: "lucide-map-pin",
        },
        {
          id: 4,
          title: "Horario",
          content: "Lun - Vie: 9:00 - 18:00 Sáb: 9:00 - 14:00",
          icon: "lucide-clock",
        },
      ],
    },
  },
  de: {
    id: 2,
    documentId: "fallback-home-de",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    locale: "de",
    hero: {
      title: "Professionelle Steuerberatung",
      subtitle:
        "Integrierte steuerliche und unternehmerische Lösungen für Ihr Geschäftswachstum",
      description:
        "Wir sind Experten für Steuer- und Unternehmensberatung und helfen Unternehmen und Privatpersonen dabei, ihre Steuern zu optimieren und ihre Geschäfte effizient zu verwalten.",
      ctaText: "Kostenlose Beratung",
      ctaLink: "/reservar/",
      image: {
        url: "/argentatreuhand-logo.png",
        alternativeText: "Argenta Treuhand Logo",
      },
    },
    slider: {
      title: "Unsere Dienstleistungen",
      subtitle: "Integrierte Lösungen für Ihr Unternehmen",
      slides: [
        {
          id: 1,
          order: 1,
          title: "Professionelle Steuerberatung",
          subtitle: "Optimieren Sie Ihre Steuern mit Experten",
          image: [
            {
              url: "/argentatreuhand-logo.png",
              alternativeText: "Steuerberatung",
            },
          ],
        },
        {
          id: 2,
          order: 2,
          title: "Unternehmensgründung",
          subtitle: "Wir begleiten Sie durch den gesamten Prozess",
          image: [
            {
              url: "/argentatreuhand-logo.png",
              alternativeText: "Unternehmensgründung",
            },
          ],
        },
      ],
    },
    services: {
      id: 1,
      title: "Unsere Dienstleistungen",
      description: "Integrierte steuerliche und unternehmerische Lösungen",
      service: [
        {
          id: 1,
          title: "Steuererklärung",
          description: "Vorbereitung und Einreichung von Steuererklärungen",
          icon: "lucide-calculator",
          feature: [
            { id: 1, name: "Einkommensteuererklärung" },
            { id: 2, name: "Umsatzsteuer" },
            { id: 3, name: "Körperschaftsteuer" },
          ],
        },
        {
          id: 2,
          title: "Unternehmensgründung",
          description: "Wir begleiten Sie durch den gesamten Gründungsprozess",
          icon: "lucide-building",
          feature: [
            { id: 4, name: "Rechtsformwahl" },
            { id: 5, name: "Handelsregister" },
            { id: 6, name: "Steuerliche Anmeldungen" },
          ],
        },
      ],
    },
    whyChooseUs: {
      id: 1,
      sectionTitle: "Warum Uns Wählen?",
      description: "Wir sind mehr als eine Steuerberatung",
      why_point: [
        {
          id: 1,
          title: "Zertifizierte Erfahrung",
          text: "Über 15 Jahre Erfahrung in der Steuerberatung",
          icon: "lucide-award",
        },
        {
          id: 2,
          title: "Schnelle Antwort",
          text: "Antwort auf alle Ihre Anfragen innerhalb von 24 Stunden",
          icon: "lucide-clock",
        },
      ],
    },
    testimonials: {
      id: 1,
      title: "Was Unsere Kunden Sagen",
      description: "Das Vertrauen unserer Kunden ist unsere beste Empfehlung",
      testimonialItem: [
        {
          id: 1,
          name: "Mario González",
          position: "CEO, TechStart Berlin",
          quote:
            "Argenta Treuhand hat uns bei der Gründung unseres Unternehmens und der Optimierung unserer Steuern von Anfang an geholfen.",
          photo: {
            url: "/argentatreuhand-logo.png",
            alternativeText: "Mario González",
          },
        },
      ],
    },
    contact: {
      id: 1,
      title: "Kontaktinformationen",
      contacts: [
        {
          id: 1,
          title: "Telefon",
          content: "+41 44 123 45 67",
          icon: "lucide-phone",
        },
        {
          id: 2,
          title: "E-Mail",
          content: "info@argentatreuhand.com",
          icon: "lucide-mail",
        },
        {
          id: 3,
          title: "Adresse",
          content: "Bahnhofstrasse 123 8001 Zürich, Schweiz",
          icon: "lucide-map-pin",
        },
        {
          id: 4,
          title: "Öffnungszeiten",
          content: "Mo - Fr: 9:00 - 18:00 Sa: 9:00 - 14:00",
          icon: "lucide-clock",
        },
      ],
    },
  },
};
