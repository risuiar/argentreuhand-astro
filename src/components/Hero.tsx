import React from 'react';
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  lang: 'es' | 'de';
  translations: any;
}

export default function Hero({ lang, translations }: HeroProps) {
  const t = translations;
  
  return (
    <section id="inicio" className="relative bg-gradient-to-br from-blue-50 via-white to-slate-50 pt-28 pb-20">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-slate-100/50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="h-4 w-4 mr-2" />
            {t.hero.badge}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {t.hero.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              {t.hero.titleHighlight1}
            </span>{' '}
            {lang === 'es' ? 'y' : 'und'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
              {t.hero.titleHighlight2}
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg" 
              onClick={() => window.location.href = lang === 'de' ? '/de/reservar/' : '/reservar/'}
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.hero.ctaSecondary}
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">500+</div>
                <div className="text-slate-600">{t.hero.stats.clients}</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl mb-4">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">€2M+</div>
                <div className="text-slate-600">{t.hero.stats.savings}</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl mb-4">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">15+</div>
                <div className="text-slate-600">{t.hero.stats.experience}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}