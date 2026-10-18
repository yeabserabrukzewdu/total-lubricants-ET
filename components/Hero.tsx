
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS, BRANCH_INFO } from '../constants';
import { MapPin, ShieldCheck, Zap, ArrowDown, PhoneCall } from 'lucide-react';

interface HeroProps {
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = (key: string) => TRANSLATIONS[language][key] || key;
  
  return (
    <section className="relative min-h-[560px] md:min-h-[680px] flex items-center overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1486497395442-885f2042ad2a?q=80&w=2070&auto=format&fit=crop" 
          alt="TotalEnergies Gulele Medhanialem Branch Engine Care" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/85 to-blue-950/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-black/30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Branch badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 font-extrabold text-xs uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span>{t('hero_badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-[1.08] tracking-tight">
            {language === 'en' ? (
              <>
                Keep your engine <br/> 
                <span className="text-red-500 relative inline-block">
                  younger for longer.
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                    <path d="M0 5c20-3 40-3 100 0" stroke="#ef4444" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </>
            ) : (
              <span className="text-white relative inline-block">
                {t('hero_title')}
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 5c20-3 40-3 100 0" stroke="#ef4444" strokeWidth="4" fill="none" />
                </svg>
              </span>
            )}
          </h1>

          <p className="text-lg md:text-xl text-blue-100/90 mb-8 leading-relaxed max-w-2xl font-normal">
            {t('hero_desc')}
          </p>

          {/* Branch Highlights Pills */}
          <div className="flex flex-wrap gap-2.5 mb-10 text-xs font-semibold text-white/90">
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'en' ? '100% Genuine Total Stock' : '100% ኦሪጅናል ምርቶች'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>{language === 'en' ? 'Gulele Medhanialem Church Area' : 'ጉለሌ መድኃኔዓለም አካባቢ'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{language === 'en' ? 'Pickup & Express Delivery' : 'ፈጣን ርክክብ እና ማድረስ'}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#products" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-red-600/30 hover:-translate-y-0.5 active:scale-95 text-base text-center flex items-center justify-center gap-2"
            >
              <span>{t('hero_cta')}</span>
              <ArrowDown className="w-4 h-4" />
            </a>
            <a 
              href="#branch-info" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-2xl font-black transition-all hover:-translate-y-0.5 active:scale-95 text-base text-center flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-red-400" />
              <span>{t('hero_secondary')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
