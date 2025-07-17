import React from 'react';
import { 
  Calculator, 
  FileText, 
  TrendingUp, 
  Building, 
  PiggyBank, 
  Scale,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServicesProps {
  lang: 'es' | 'de';
  translations: any;
}

export default function Services({ lang, translations }: ServicesProps) {
  const t = translations;
  
  const services = [
    {
      icon: Calculator,
      title: t.services.items.taxes.title,
      description: t.services.items.taxes.description,
      features: t.services.items.taxes.features,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Building,
      title: t.services.items.company.title,
      description: t.services.items.company.description,
      features: t.services.items.company.features,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      icon: TrendingUp,
      title: t.services.items.planning.title,
      description: t.services.items.planning.description,
      features: t.services.items.planning.features,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: FileText,
      title: t.services.items.accounting.title,
      description: t.services.items.accounting.description,
      features: t.services.items.accounting.features,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      icon: PiggyBank,
      title: t.services.items.consulting.title,
      description: t.services.items.consulting.description,
      features: t.services.items.consulting.features,
      color: 'bg-rose-50 text-rose-600'
    },
    {
      icon: Scale,
      title: t.services.items.defense.title,
      description: t.services.items.defense.description,
      features: t.services.items.defense.features,
      color: 'bg-indigo-50 text-indigo-600'
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t.services.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${service.color}`}>
                <service.icon className="h-8 w-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-slate-600">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
              >
                {t.services.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}