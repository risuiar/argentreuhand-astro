import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLocalizedLink } from "@/lib/i18n";
import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface FormData {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  captchaAnswer: string;
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  type?: string;
  message?: string;
  captchaAnswer?: string;
}

interface CaptchaData {
  question: string;
  answer: number;
}

export default function Contact({ lang, contactData }: ContactProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
    captchaAnswer: "",
    website: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [captcha, setCaptcha] = useState<CaptchaData>({
    question: "",
    answer: 0,
  });

  const formCardRef = useRef<HTMLDivElement>(null);

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Generate a simple math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "×"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let answer: number;
    let question: string;

    switch (operator) {
      case "+":
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case "-":
        answer = num1 - num2;
        question = `${num1} - ${num2}`;
        break;
      case "×":
        answer = num1 * num2;
        question = `${num1} × ${num2}`;
        break;
      default:
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
    }

    setCaptcha({ question, answer });
    // Clear previous captcha answer
    setFormData((prev) => ({ ...prev, captchaAnswer: "" }));
  };

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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        lang === "es" ? "El nombre es requerido" : "Name ist erforderlich";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        lang === "es" ? "El email es requerido" : "E-Mail ist erforderlich";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = lang === "es" ? "Email inválido" : "Ungültige E-Mail";
    }

    if (!formData.type || formData.type === "") {
      newErrors.type =
        lang === "es" ? "El asunto es requerido" : "Betreff ist erforderlich";
    }

    if (!formData.message.trim()) {
      newErrors.message =
        lang === "es"
          ? "El mensaje es requerido"
          : "Nachricht ist erforderlich";
    }

    if (!formData.captchaAnswer.trim()) {
      newErrors.captchaAnswer =
        lang === "es"
          ? "Por favor resuelve el captcha"
          : "Bitte lösen Sie das Captcha";
    } else if (parseInt(formData.captchaAnswer) !== captcha.answer) {
      newErrors.captchaAnswer =
        lang === "es" ? "Respuesta incorrecta" : "Falsche Antwort";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          type: formData.type,
          message: formData.message,
          language: lang,
          website: formData.website,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage(
          lang === "es"
            ? "¡Mensaje enviado con éxito! Te contactaremos pronto."
            : "Nachricht erfolgreich gesendet! Wir werden uns bald bei Ihnen melden."
        );
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          type: "",
          message: "",
          captchaAnswer: "",
          website: "",
        });
        // Clear errors
        setErrors({});
        // Generate new captcha
        generateCaptcha();
      } else {
        setSubmitStatus("error");
        setSubmitMessage(
          lang === "es"
            ? "Error al enviar el mensaje. Inténtalo de nuevo."
            : "Fehler beim Senden der Nachricht. Versuchen Sie es erneut."
        );
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        lang === "es"
          ? "Error de conexión. Inténtalo de nuevo."
          : "Verbindungsfehler. Versuchen Sie es erneut."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitStatus === "success" && formCardRef.current) {
      formCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [submitStatus]);

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {contactData.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {lang === "es"
              ? "Estamos aquí para ayudarte. Consulta profesional sin compromiso."
              : "Wir sind hier, um Ihnen zu helfen. Professionelle Beratung ohne Verpflichtung."}
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
              <a
                href={getLocalizedLink("/reservar/", lang)}
                className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-slate-100 w-full px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {lang === "es" ? "Reservar Consulta" : "Beratung buchen"}
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formCardRef} className="bg-slate-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              {lang === "es"
                ? "Envíanos un Mensaje"
                : "Senden Sie uns eine Nachricht"}
            </h3>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-800">{submitMessage}</span>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                <span className="text-red-800">{submitMessage}</span>
              </div>
            )}

            {/* Mostrar el formulario solo si no es success */}
            {submitStatus !== "success" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - Invisible to humans */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {lang === "es" ? "Nombre" : "Name"} *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.name ? "border-red-300" : "border-slate-200"
                      }`}
                      placeholder={lang === "es" ? "Tu nombre" : "Ihr Name"}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {lang === "es" ? "Email" : "E-Mail"} *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? "border-red-300" : "border-slate-200"
                      }`}
                      placeholder={
                        lang === "es" ? "tu@email.com" : "ihre@email.com"
                      }
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {lang === "es" ? "Teléfono" : "Telefon"}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+41 76 510 03 80"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {lang === "es" ? "Asunto" : "Betreff"} *
                  </label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger
                      className={`w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.type ? "border-red-300" : "border-slate-200"
                      }`}
                    >
                      <SelectValue
                        placeholder={
                          lang === "es"
                            ? "Selecciona un asunto"
                            : "Betreff auswählen"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-slate-200 rounded-xl shadow-lg">
                      <SelectItem value="general">
                        {lang === "es"
                          ? "Consulta general"
                          : "Allgemeine Anfrage"}
                      </SelectItem>
                      <SelectItem value="taxes">
                        {lang === "es"
                          ? "Declaración de impuestos"
                          : "Steuererklärung"}
                      </SelectItem>
                      <SelectItem value="company">
                        {lang === "es"
                          ? "Constitución de empresa"
                          : "Unternehmensgründung"}
                      </SelectItem>
                      <SelectItem value="planning">
                        {lang === "es"
                          ? "Planificación fiscal"
                          : "Steuerplanung"}
                      </SelectItem>
                      <SelectItem value="other">
                        {lang === "es" ? "Otros" : "Andere"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {lang === "es" ? "Mensaje" : "Nachricht"} *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.message ? "border-red-300" : "border-slate-200"
                    }`}
                    placeholder={
                      lang === "es"
                        ? "Describe tu consulta..."
                        : "Beschreiben Sie Ihre Anfrage..."
                    }
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Captcha Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    {lang === "es"
                      ? "Verificación de Seguridad"
                      : "Sicherheitsüberprüfung"}{" "}
                    *
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="text-center mb-2">
                        <span className="text-lg font-mono bg-white px-4 py-2 rounded-lg border border-blue-300">
                          {captcha.question} = ?
                        </span>
                      </div>
                      <input
                        type="number"
                        value={formData.captchaAnswer}
                        onChange={(e) =>
                          handleInputChange("captchaAnswer", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.captchaAnswer
                            ? "border-red-300"
                            : "border-slate-200"
                        }`}
                        placeholder={
                          lang === "es" ? "Tu respuesta" : "Ihre Antwort"
                        }
                      />
                      {errors.captchaAnswer && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.captchaAnswer}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-xl transition-colors"
                      title={lang === "es" ? "Nuevo captcha" : "Neues Captcha"}
                    >
                      <RefreshCw className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {lang === "es"
                      ? "Resuelve esta operación matemática para verificar que eres humano"
                      : "Lösen Sie diese mathematische Operation, um zu bestätigen, dass Sie ein Mensch sind"}
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 text-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {lang === "es" ? "Enviando..." : "Wird gesendet..."}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      {lang === "es" ? "Enviar Mensaje" : "Nachricht senden"}
                      <Send className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
