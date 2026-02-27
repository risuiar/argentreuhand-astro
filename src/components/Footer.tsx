import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { getLocalizedLink } from "@/lib/i18n";

interface ContactItem {
  id: number;
  title: string;
  content: string;
  icon: string;
}

interface FooterProps {
  lang: "es" | "de";
  contactData?: {
    id: number;
    title: string;
    contacts: ContactItem[];
  };
  description?: string;
}

export default function Footer({
  lang,
  contactData,
  description,
}: FooterProps) {
  // Map icon names to components
  const iconMap: { [key: string]: any } = {
    "lucide-phone": Phone,
    "lucide-mail": Mail,
    "lucide-map-pin": MapPin,
    "lucide-clock": Clock,
  };

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <a
                href={getLocalizedLink("/", lang)}
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="/logo-argentatreuhand_s.webp"
                  alt="Argenta Treuhand Logo"
                  className="h-16 w-auto object-contain"
                />
              </a>
              <div>
                <h3 className="text-xl font-bold">Argenta Treuhand</h3>
                <p className="text-slate-400 text-sm">
                  {lang === "es"
                    ? "Asesoría Fiscal & Consultoría Empresarial"
                    : "Steuerberatung & Unternehmensberatung"}
                </p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {description ||
                (lang === "es"
                  ? "Expertos en consultoría fiscal y empresarial con más de 15 años de experiencia ayudando a emprendedores y empresas a crecer."
                  : "Experten für Steuer- und Unternehmensberatung mit über 15 Jahren Erfahrung, die Unternehmern und Unternehmen beim Wachstum helfen.")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {lang === "es" ? "Enlaces Rápidos" : "Schnelllinks"}
            </h4>
            <ul className="space-y-2">
              {[
                {
                  label: lang === "es" ? "Inicio" : "Startseite",
                  href: getLocalizedLink("/", lang),
                },
                {
                  label: lang === "es" ? "Servicios" : "Dienstleistungen",
                  href: getLocalizedLink("/#servicios", lang),
                },
                {
                  label: lang === "es" ? "Sobre Nosotros" : "Über uns",
                  href: getLocalizedLink("/#sobre-nosotros", lang),
                },
                {
                  label: lang === "es" ? "Contacto" : "Kontakt",
                  href: getLocalizedLink("/#contacto", lang),
                },
                {
                  label:
                    lang === "es" ? "Reservar Consulta" : "Beratung buchen",
                  href: getLocalizedLink("/reservar/", lang),
                },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {lang === "es" ? "Contacto" : "Kontakt"}
            </h4>
            <div className="space-y-4">
              {contactData?.contacts ? (
                contactData.contacts.map((contact) => {
                  const IconComponent = iconMap[contact.icon] || Phone;
                  return (
                    <div
                      key={contact.id}
                      className="flex items-center space-x-3"
                    >
                      <IconComponent className="h-5 w-5 text-blue-400" />
                      <span className="text-slate-400 whitespace-pre-line">
                        {contact.content}
                      </span>
                    </div>
                  );
                })
              ) : (
                // Fallback si no hay datos de la API
                <>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-400" />
                    <a
                      href="tel:+41765100380"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      +41 76 510 03 80
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <a
                      href="mailto:info@argentatreuhand.com"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      info@argentatreuhand.com
                    </a>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                    <span className="text-slate-400">
                      Bahnhofstrasse 123
                      <br />
                      8001 Zürich, Schweiz
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-blue-400 mt-1" />
                    <span className="text-slate-400 whitespace-pre-line">
                      {lang === "es"
                        ? "Lun - Vie: 9:00 - 18:00\nSáb: 9:00 - 14:00"
                        : "Mo - Fr: 9:00 - 18:00\nSa: 9:00 - 14:00"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 text-sm text-slate-400">
            <a
              href={
                lang === "es"
                  ? "/declaracion-de-privacidad/"
                  : "/de/datenschutz/"
              }
              className="hover:text-white transition-colors"
            >
              {lang === "es"
                ? "Declaración de Privacidad"
                : "Datenschutzerklärung"}
            </a>
            <a
              href={
                lang === "es"
                  ? "/condiciones-generales/"
                  : "/de/allgemeine-geschaeftsbedingungen/"
              }
              className="hover:text-white transition-colors"
            >
              {lang === "es"
                ? "Condiciones Generales"
                : "Allgemeine Geschäftsbedingungen"}
            </a>
          </div>
          <p className="text-slate-400">
            © {new Date().getFullYear()} Argenta Treuhand.{" "}
            {lang === "es"
              ? "Todos los derechos reservados."
              : "Alle Rechte vorbehalten."}
          </p>
        </div>
      </div>
    </footer>
  );
}
