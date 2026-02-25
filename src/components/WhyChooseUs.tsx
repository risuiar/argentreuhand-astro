import { Award, Clock, Users, Zap, Shield, HeartHandshake } from "lucide-react";
import Founder from "./Founder";
import type { StrapiImage } from "../utils/imageHelpers";

interface WhyPoint {
  id: number;
  title: string;
  text: string;
  icon: string;
}

interface WhyChooseUsData {
  id: number;
  sectionTitle: string;
  description: string;
  why_point: WhyPoint[];
  stats?: {
    clients: string;
    satisfaction: string;
    savings: string;
    response: string;
  };
  founder?: {
    name: string;
    title: string;
    description: string;
    founder_credential?: {
      credential: string;
    }[];
    image?: StrapiImage;
  };
}

interface WhyChooseUsProps {
  lang: "es" | "de";
  whyChooseUsData: WhyChooseUsData;
}

export default function WhyChooseUs({
  lang,
  whyChooseUsData,
}: WhyChooseUsProps) {
  // Map icon names to components
  const iconMap: { [key: string]: any } = {
    "lucide-award": Award,
    "lucide-clock": Clock,
    "lucide-users": Users,
    "lucide-zap": Zap,
    "lucide-shield": Shield,
    "lucide-heart-handshake": HeartHandshake,
  };

  const colors = [
    "bg-brand-blue/5 text-brand-blue",
    "bg-emerald-50 text-emerald-600",
    "bg-purple-50 text-purple-600",
    "bg-yellow-50 text-yellow-600",
    "bg-rose-50 text-rose-600",
    "bg-indigo-50 text-indigo-600",
  ];

  const reasons = whyChooseUsData.why_point.map((point, index) => ({
    icon: iconMap[point.icon] || Award,
    title: point.title,
    description: point.text,
    color: colors[index % colors.length],
  }));

  return (
    <section
      id="sobre-nosotros"
      className="py-20 bg-gradient-to-br from-slate-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {whyChooseUsData.sectionTitle}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {whyChooseUsData.description}
          </p>
        </div>

        {whyChooseUsData.founder && (
          <Founder
            name={whyChooseUsData.founder.name}
            title={whyChooseUsData.founder.title}
            description={whyChooseUsData.founder.description}
            credentials={
              whyChooseUsData.founder.founder_credential?.map(
                (c) => c.credential
              ) || []
            }
            photo={whyChooseUsData.founder.image || null}
            lang={lang}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${reason.color}`}
              >
                <reason.icon className="h-8 w-8" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {reason.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        {whyChooseUsData.stats && (
          <div className="mt-20 bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-blue mb-2">
                  {whyChooseUsData.stats.clients || "500+"}
                </div>
                <div className="text-slate-600">
                  {lang === "es" ? "Clientes Activos" : "Aktive Kunden"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  {whyChooseUsData.stats.satisfaction || "98%"}
                </div>
                <div className="text-slate-600">
                  {lang === "es" ? "Satisfacción" : "Zufriedenheit"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {whyChooseUsData.stats.savings || "€2M+"}
                </div>
                <div className="text-slate-600">
                  {lang === "es" ? "Ahorro Fiscal" : "Steuereinsparungen"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">
                  {whyChooseUsData.stats.response || "24h"}
                </div>
                <div className="text-slate-600">
                  {lang === "es" ? "Tiempo Respuesta" : "Antwortzeit"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
