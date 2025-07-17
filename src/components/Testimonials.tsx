import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  lang: 'es' | 'de';
  translations: any;
}

export default function Testimonials({ lang, translations }: TestimonialsProps) {
  const t = translations;

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t.testimonials.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.testimonials.items.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 relative">
              <div className="absolute top-6 right-6 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Quote className="h-6 w-6 text-blue-600" />
              </div>
              
              <div className="flex items-center mb-6">
                <img 
                  src={`https://images.pexels.com/photos/${index === 0 ? '3785077' : index === 1 ? '2381069' : '3586798'}/pexels-photo-${index === 0 ? '3785077' : index === 1 ? '2381069' : '3586798'}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-slate-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-slate-600 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}