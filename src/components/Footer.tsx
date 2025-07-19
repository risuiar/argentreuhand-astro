import { Phone, Mail, MapPin, Clock } from "lucide-react";

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
  translations?: any; // Para compatibilidad con páginas que usan translations
}

export default function Footer({
  lang,
  contactData,
  translations,
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
              <img
                src="/logo.png"
                alt="Argenta Treuhand Logo"
                className="h-12 w-auto object-contain"
              />
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
              {lang === "es"
                ? "Expertos en consultoría fiscal y empresarial con más de 15 años de experiencia ayudando a emprendedores y empresas a crecer."
                : "Experten für Steuer- und Unternehmensberatung mit über 15 Jahren Erfahrung, die Unternehmern und Unternehmen beim Wachstum helfen."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {lang === "es" ? "Enlaces Rápidos" : "Schnelllinks"}
            </h4>
            <ul className="space-y-2">
              {[
                { label: lang === "es" ? "Inicio" : "Startseite", href: "/" },
                {
                  label: lang === "es" ? "Servicios" : "Dienstleistungen",
                  href: "/#servicios",
                },
                {
                  label: lang === "es" ? "Sobre Nosotros" : "Über uns",
                  href: "/#sobre-nosotros",
                },
                {
                  label: lang === "es" ? "Contacto" : "Kontakt",
                  href: "/#contacto",
                },
                {
                  label:
                    lang === "es" ? "Reservar Consulta" : "Beratung buchen",
                  href: lang === "de" ? "/de/reservar/" : "/reservar/",
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
                    <span className="text-slate-400">+41 76 510 03 80</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <span className="text-slate-400">
                      info@argentatreuhand.com
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                    <span className="text-slate-400">
                      Bahnhofstrasse 123
                      <br />
                      8001 Zürich, Schweiz
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
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
