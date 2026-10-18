
import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, User, X, MapPin, Phone, Clock } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, BRANCH_INFO } from '../constants';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSearch: (query: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onSearch, language, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = (key: string) => TRANSLATIONS[language][key] || key;

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-red-950 text-white text-xs py-2 px-4 fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-sm">
        <div className="container mx-auto flex items-center justify-between text-[11px] font-medium">
          <div className="flex items-center gap-2 tracking-wide truncate">
            <span className="flex h-2 w-2 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-semibold text-white/95 truncate">
              {t('top_announcement')}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-blue-100/90 flex-shrink-0 ml-4">
            <a 
              href={`tel:${BRANCH_INFO.phone}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>{BRANCH_INFO.phone}</span>
            </a>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5 text-blue-200/80">
              <Clock className="w-3.5 h-3.5 text-blue-300" />
              <span className="hidden md:inline">{language === 'en' ? 'Gulele, Addis Ababa' : 'ጉለሌ፣ አዲስ አበባ'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="fixed top-8 left-0 right-0 z-40 transition-all duration-300 glass-nav border-b border-gray-100/70 shadow-sm">
        <div className="container mx-auto px-4 py-3.5 flex items-center justify-between">
          {/* Logo & Branch Indicator */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <div 
              className="flex flex-col cursor-pointer group" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-black tracking-tighter text-blue-950 leading-none">TotalEnergies</span>
                <span className="text-[9px] md:text-[10px] uppercase font-extrabold text-red-600 tracking-widest bg-red-50 px-1.5 py-0.5 rounded">Lubricants</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3 h-3 text-red-600 flex-shrink-0" />
                <span className="text-[11px] md:text-xs font-bold text-gray-700 group-hover:text-blue-900 transition-colors">
                  {language === 'en' ? BRANCH_INFO.name : BRANCH_INFO.name_am}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden xl:flex items-center gap-6 text-sm font-bold text-gray-600">
            <a href="#" className="hover:text-red-600 transition-colors">{t('nav_home')}</a>
            <a href="#products" className="hover:text-red-600 transition-colors">{t('nav_products')}</a>
            <a href="#finder" className="hover:text-red-600 transition-colors">{t('nav_finder')}</a>
            <a href="#branch-info" className="flex items-center gap-1.5 text-blue-900 hover:text-red-600 transition-colors bg-blue-50/80 px-3 py-1.5 rounded-xl border border-blue-100">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>{t('nav_branch')}</span>
            </a>
            <a href="#contact" className="hover:text-red-600 transition-colors">{t('nav_contact')}</a>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-xs xl:max-w-sm mx-4 relative">
            <input 
              type="text" 
              placeholder={language === 'en' ? 'Search Gulele branch stock...' : 'ምርቶችን በጉለሌ ቅርንጫፍ ይፈልጉ...'}
              className="w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-2xl bg-gray-50 border border-gray-200/80 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Search className="absolute left-3.5 top-2.5 text-gray-400 w-4 h-4" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Toggle */}
            <div className="flex bg-gray-100/80 p-1 rounded-2xl border border-gray-200">
              <button 
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-black transition-all ${language === 'en' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
              >
                EN
              </button>
              <button 
                onClick={() => onLanguageChange('am')}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-black transition-all ${language === 'am' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
              >
                አማ
              </button>
            </div>

            <a 
              href="#branch-info"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-white hover:border-red-300 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>Gulele</span>
            </a>

            <button 
              onClick={onOpenCart}
              className="relative p-2.5 bg-gray-950 text-white rounded-2xl hover:bg-red-600 transition-all shadow-lg hover:shadow-red-600/20 active:scale-95"
              aria-label="Open Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile Drawer */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-[300px] z-[70] bg-white transition-transform duration-300 ease-out lg:hidden shadow-2xl flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 flex flex-col h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex flex-col">
              <span className="text-xl font-black text-blue-900 leading-none">TotalEnergies</span>
              <span className="text-[10px] font-bold text-red-600 uppercase mt-0.5">
                {language === 'en' ? BRANCH_INFO.name : BRANCH_INFO.name_am}
              </span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Mobile search */}
          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder={language === 'en' ? 'Search products...' : 'ምርቶችን ይፈልጉ...'}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 outline-none"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-3.5 h-3.5" />
          </div>

          <div className="space-y-1.5 flex-1">
            <a 
              href="#" 
              onClick={() => setIsMenuOpen(false)} 
              className="block px-4 py-3 rounded-xl font-bold text-gray-800 hover:bg-gray-50 hover:text-red-600 transition-colors"
            >
              {t('nav_home')}
            </a>
            <a 
              href="#products" 
              onClick={() => setIsMenuOpen(false)} 
              className="block px-4 py-3 rounded-xl font-bold text-gray-800 hover:bg-gray-50 hover:text-red-600 transition-colors"
            >
              {t('nav_products')}
            </a>
            <a 
              href="#finder" 
              onClick={() => setIsMenuOpen(false)} 
              className="block px-4 py-3 rounded-xl font-bold text-gray-800 hover:bg-gray-50 hover:text-red-600 transition-colors"
            >
              {t('nav_finder')}
            </a>
            <a 
              href="#branch-info" 
              onClick={() => setIsMenuOpen(false)} 
              className="flex items-center justify-between px-4 py-3 rounded-xl font-bold text-blue-900 bg-blue-50/60 hover:bg-blue-100 transition-colors"
            >
              <span>{t('nav_branch')}</span>
              <MapPin className="w-4 h-4 text-red-600" />
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)} 
              className="block px-4 py-3 rounded-xl font-bold text-gray-800 hover:bg-gray-50 hover:text-red-600 transition-colors"
            >
              {t('nav_contact')}
            </a>
          </div>

          {/* Branch Quick Contact Card in Drawer */}
          <div className="pt-4 border-t border-gray-100 mt-4 space-y-3">
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span className="text-xs font-bold text-blue-950">
                  {language === 'en' ? BRANCH_INFO.name : BRANCH_INFO.name_am}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-snug mb-2">
                {language === 'en' ? BRANCH_INFO.address : BRANCH_INFO.address_am}
              </p>
              <div className="text-[10px] text-gray-400 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <span>{language === 'en' ? BRANCH_INFO.working_hours : BRANCH_INFO.working_hours_am}</span>
              </div>
            </div>

            <a 
              href={`tel:${BRANCH_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-950 text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>{language === 'en' ? 'Call Gulele Branch' : 'ወደ ቅርንጫፉ ይደውሉ'}</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Spacer for top announcement bar (32px) + fixed navbar (72px) = 104px */}
      <div className="h-[104px]"></div>
    </>
  );
};
