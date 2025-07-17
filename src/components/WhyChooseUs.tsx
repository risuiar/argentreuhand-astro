import { Award, Clock, Users, Zap, Shield, HeartHandshake } from "lucide-react";

interface WhyChooseUsProps {
  lang: "es" | "de";
  translations: any;
}

export default function WhyChooseUs({ lang, translations }: WhyChooseUsProps) {
  const t = translations;

  const reasons = [
    {
      icon: Award,
      title: t.whyChooseUs.reasons.experience.title,
      description: t.whyChooseUs.reasons.experience.description,
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Clock,
      title: t.whyChooseUs.reasons.response.title,
      description: t.whyChooseUs.reasons.response.description,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Users,
      title: t.whyChooseUs.reasons.personal.title,
      description: t.whyChooseUs.reasons.personal.description,
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Zap,
      title: t.whyChooseUs.reasons.technology.title,
      description: t.whyChooseUs.reasons.technology.description,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      icon: Shield,
      title: t.whyChooseUs.reasons.security.title,
      description: t.whyChooseUs.reasons.security.description,
      color: "bg-rose-50 text-rose-600",
    },
    {
      icon: HeartHandshake,
      title: t.whyChooseUs.reasons.commitment.title,
      description: t.whyChooseUs.reasons.commitment.description,
      color: "bg-indigo-50 text-indigo-600",
    },
  ];

  return (
    <section
      id="sobre-nosotros"
      className="py-20 bg-gradient-to-br from-slate-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t.whyChooseUs.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t.whyChooseUs.subtitle}
          </p>
        </div>

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
        <div className="mt-20 bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-slate-600">
                {t.whyChooseUs.stats.clients}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                98%
              </div>
              <div className="text-slate-600">
                {t.whyChooseUs.stats.satisfaction}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                €2M+
              </div>
              <div className="text-slate-600">
                {t.whyChooseUs.stats.savings}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">24h</div>
              <div className="text-slate-600">
                {t.whyChooseUs.stats.response}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
