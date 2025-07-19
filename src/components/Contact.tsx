import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactItem {
  id: number;
  title: string;
  content: string;
  icon: string;
}

interface ContactData {
  id: number;
  title: string;
  contacts: ContactItem[];
}

interface ContactProps {
  lang: "es" | "de";
  contactData: ContactData;
}

export default function Contact({ lang, contactData }: ContactProps) {
  // Map icon names to components
  const iconMap: { [key: string]: any } = {
    "lucide-phone": Phone,
    "lucide-mail": Mail,
    "lucide-map-pin": MapPin,
    "lucide-clock": Clock,
  };

  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-emerald-100 text-emerald-600",
    "bg-purple-100 text-purple-600",
    "bg-yellow-100 text-yellow-600",
  ];

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {contactData.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {lang === "es"
              ? "Estamos aquí para ayudarte. Consulta gratuita sin compromiso."
              : "Wir sind hier, um Ihnen zu helfen. Kostenlose Beratung ohne Verpflichtung."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {lang === "es"
                  ? "Información de Contacto"
                  : "Kontaktinformationen"}
              </h3>

              <div className="space-y-6">
                {contactData.contacts.map((contact, index) => {
                  const IconComponent = iconMap[contact.icon] || Phone;
                  return (
                    <div key={contact.id} className="flex items-center">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                          colors[index % colors.length]
                        }`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {contact.title}
                        </div>
                        <div className="text-slate-600 whitespace-pre-line">
                          {contact.content}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                {lang === "es"
                  ? "¿Necesitas Asesoría Profesional?"
                  : "Benötigen Sie professionelle Beratung?"}
              </h3>
              <p className="mb-6 opacity-90">
                {lang === "es"
                  ? "Programa una consulta profesional de 60 minutos y descubre cómo podemos ayudarte."
                  : "Vereinbaren Sie eine 60-minütige professionelle Beratung und erfahren Sie, wie wir Ihnen helfen können."}
              </p>
              <Button
                className="bg-white text-blue-600 hover:bg-slate-100 w-full"
                onClick={() =>
                  (window.location.href =
                    lang === "de" ? "/de/reservar/" : "/reservar/")
                }
              >
                {lang === "es" ? "Reservar Consulta" : "Beratung buchen"}
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              {lang === "es"
                ? "Envíanos un Mensaje"
                : "Senden Sie uns eine Nachricht"}
            </h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {lang === "es" ? "Nombre" : "Name"}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={lang === "es" ? "Tu nombre" : "Ihr Name"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {lang === "es" ? "Email" : "E-Mail"}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={
                      lang === "es" ? "tu@email.com" : "ihre@email.com"
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {lang === "es" ? "Teléfono" : "Telefon"}
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+41 76 510 03 80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {lang === "es" ? "Asunto" : "Betreff"}
                </label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>
                    {lang === "es" ? "Consulta general" : "Allgemeine Anfrage"}
                  </option>
                  <option>
                    {lang === "es"
                      ? "Declaración de impuestos"
                      : "Steuererklärung"}
                  </option>
                  <option>
                    {lang === "es"
                      ? "Constitución de empresa"
                      : "Unternehmensgründung"}
                  </option>
                  <option>
                    {lang === "es" ? "Planificación fiscal" : "Steuerplanung"}
                  </option>
                  <option>{lang === "es" ? "Otros" : "Andere"}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {lang === "es" ? "Mensaje" : "Nachricht"}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={
                    lang === "es"
                      ? "Describe tu consulta..."
                      : "Beschreiben Sie Ihre Anfrage..."
                  }
                ></textarea>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg">
                {lang === "es" ? "Enviar Mensaje" : "Nachricht senden"}
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
