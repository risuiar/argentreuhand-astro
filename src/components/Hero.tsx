import { ArrowRight, Shield, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLocalizedLink } from "@/lib/i18n";

interface HeroData {
  id: number;
  title: string;
  subtitle?:
    | string
    | Array<{
        type: string;
        children: Array<{
          text: string;
          type: string;
        }>;
      }>;
  ctaText?: string;
  ctaLink?: string;
  moto?: string;
  image?: any;
  stats?: {
    clients: string;
    savings: string;
    experience: string;
  };
  order?: number;
}

interface HeroProps {
  lang: "es" | "de";
  heroData: HeroData;
}

export default function Hero({ lang, heroData }: HeroProps) {
  // Safety check for required fields
  if (!heroData || !heroData.title) {
    console.warn("Hero data is missing or incomplete:", heroData);
    return (
      <section
        id="inicio"
        className="relative bg-gradient-to-br from-blue-50 via-white to-slate-50 pt-28 pb-20"
      >
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-red-600">
              <p>Error: Datos del hero no disponibles</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="inicio"
      className="relative bg-gradient-to-br from-blue-50 via-white to-slate-50 pt-28 pb-20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-slate-100/50"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="h-4 w-4 mr-2" />
            {heroData.moto ||
              (lang === "es"
                ? "Expertos en Consultoría Fiscal"
                : "Experten für Steuerberatung")}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {heroData.title}
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {typeof heroData.subtitle === "string"
              ? heroData.subtitle
              : heroData.subtitle?.[0]?.children?.[0]?.text ||
                (lang === "es"
                  ? "Tu socio de confianza para el éxito empresarial"
                  : "Ihr vertrauensvoller Partner für unternehmerischen Erfolg")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href={getLocalizedLink("/reservar/", lang)}
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg font-medium transition-colors"
            >
              {heroData.ctaText ||
                (lang === "es" ? "Reservar Consulta" : "Beratung buchen")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href={getLocalizedLink("/#servicios", lang)}
              className="inline-flex items-center justify-center border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-lg font-medium transition-colors"
            >
              {lang === "es" ? "Ver Servicios" : "Dienstleistungen anzeigen"}
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {heroData.stats?.clients || "500+"}
                </div>
                <div className="text-slate-600">
                  {lang === "es" ? "Clientes Satisfechos" : "Zufriedene Kunden"}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl mb-4">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {heroData.stats?.savings || "CHF 2M+"}
                </div>
                <div className="text-slate-600">
                  {lang === "es" ? "Ahorro Fiscal" : "Steuereinsparungen"}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl mb-4">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {heroData.stats?.experience || "15+"}
                </div>
                <div className="text-slate-600">
                  {lang === "es" ? "Años de Experiencia" : "Jahre Erfahrung"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
