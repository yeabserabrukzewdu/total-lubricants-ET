
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeroProps {
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = (key: string) => TRANSLATIONS[language][key] || key;
  
  return (
    <section className="relative min-h-[500px] md:h-[650px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1486497395442-885f2042ad2a?q=80&w=2070&auto=format&fit=crop" 
          alt="Modern Engine Technology" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 font-bold text-xs uppercase tracking-widest mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            {t('hero_badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
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
          <p className="text-lg md:text-xl text-blue-50/90 mb-10 leading-relaxed max-w-xl font-medium">
            {t('hero_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-red-600/30 hover:-translate-y-1 active:scale-95 text-lg">
              {t('hero_cta')}
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-2xl font-bold transition-all hover:-translate-y-1 active:scale-95 text-lg">
              {t('hero_secondary')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
