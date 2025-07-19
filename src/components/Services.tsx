import {
  Calculator,
  FileText,
  TrendingUp,
  Building,
  PiggyBank,
  Scale,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceFeature {
  id: number;
  name: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  feature: ServiceFeature[];
}

interface ServicesData {
  id: number;
  title: string;
  description: string;
  service: Service[];
}

interface ServicesProps {
  lang: "es" | "de";
  servicesData: ServicesData;
}

export default function Services({ lang, servicesData }: ServicesProps) {
  // Map icon names to components
  const iconMap: { [key: string]: any } = {
    "lucide-calculator": Calculator,
    "lucide-building": Building,
    "lucide-trending-up": TrendingUp,
    "lucide-file-text": FileText,
    "lucide-piggy-bank": PiggyBank,
    "lucide-scale": Scale,
  };

  const colors = [
    "bg-blue-50 text-blue-600",
    "bg-emerald-50 text-emerald-600",
    "bg-purple-50 text-purple-600",
    "bg-yellow-50 text-yellow-600",
    "bg-rose-50 text-rose-600",
    "bg-indigo-50 text-indigo-600",
  ];

  const services = servicesData.service.map((service, index) => ({
    icon: iconMap[service.icon] || Calculator,
    title: service.title,
    description: service.description,
    features: service.feature.map((f) => f.name),
    color: colors[index % colors.length],
  }));

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {servicesData.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {servicesData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${service.color}`}
              >
                <service.icon className="h-8 w-8" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {service.title}
              </h3>

              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-slate-600">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
