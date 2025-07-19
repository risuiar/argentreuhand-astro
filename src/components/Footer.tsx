import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

interface FooterProps {
  lang: "es" | "de";
}

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AT</span>
              </div>
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
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {lang === "es" ? "Servicios" : "Dienstleistungen"}
            </h4>
            <ul className="space-y-2">
              {[
                lang === "es" ? "Declaración de Impuestos" : "Steuererklärung",
                lang === "es"
                  ? "Constitución de Empresas"
                  : "Unternehmensgründung",
                lang === "es" ? "Planificación Fiscal" : "Steuerplanung",
                lang === "es"
                  ? "Contabilidad Completa"
                  : "Vollständige Buchhaltung",
                lang === "es" ? "Consultoría Financiera" : "Finanzberatung",
                lang === "es" ? "Defensa Fiscal" : "Steuerverteidigung",
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
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
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-slate-400">+41 44 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-slate-400">info@argentatreuhand.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <span className="text-slate-400">
                  Bahnhofstrasse 123
                  <br />
                  8001 Zürich, Schweiz
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400">
              © 2025 Argenta Treuhand.{" "}
              {lang === "es"
                ? "Todos los derechos reservados."
                : "Alle Rechte vorbehalten."}
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                {lang === "es" ? "Privacidad" : "Datenschutz"}
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                {lang === "es" ? "Términos" : "AGB"}
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                {lang === "es" ? "Cookies" : "Cookies"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
