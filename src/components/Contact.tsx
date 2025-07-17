import React from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactProps {
  lang: 'es' | 'de';
  translations: any;
}

export default function Contact({ lang, translations }: ContactProps) {
  const t = translations;

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t.contact.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {t.contact.info.title}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{t.contact.info.phone}</div>
                    <div className="text-slate-600">{t.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{t.contact.info.email}</div>
                    <div className="text-slate-600">{t.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{t.contact.info.address}</div>
                    <div className="text-slate-600">Bahnhofstrasse 123<br />8001 Zürich, Schweiz</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{t.contact.info.hours}</div>
                    <div className="text-slate-600 whitespace-pre-line">{t.contact.info.hoursValue}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                {t.contact.cta.title}
              </h3>
              <p className="mb-6 opacity-90">
                {t.contact.cta.description}
              </p>
              <Button 
                className="bg-white text-blue-600 hover:bg-slate-100 w-full" 
                onClick={() => window.location.href = lang === 'de' ? '/de/reservar/' : '/reservar/'}
              >
                {t.contact.cta.button}
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              {t.contact.form.title}
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t.contact.form.placeholders.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t.contact.form.placeholders.email}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contact.form.phone}
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.contact.form.placeholders.phone}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contact.form.subject}
                </label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>{t.contact.form.subjects.general}</option>
                  <option>{t.contact.form.subjects.taxes}</option>
                  <option>{t.contact.form.subjects.company}</option>
                  <option>{t.contact.form.subjects.planning}</option>
                  <option>{t.contact.form.subjects.other}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contact.form.message}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.contact.form.placeholders.message}
                ></textarea>
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg">
                {t.contact.form.submit}
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}