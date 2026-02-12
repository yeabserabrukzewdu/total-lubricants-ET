
import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, User, X, Globe } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

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
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav border-b border-gray-100/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <span className="text-xl md:text-2xl font-black tracking-tighter text-blue-900 leading-none">TotalEnergies</span>
              <span className="text-[9px] md:text-[10px] uppercase font-bold text-red-600 tracking-widest">Lubricants</span>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8 relative">
            <input 
              type="text" 
              placeholder={t('nav_products') + "..."}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Toggle */}
            <div className="flex bg-gray-100/50 p-1 rounded-2xl border border-gray-200/50">
              <button 
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded-xl text-[10px] font-bold transition-all ${language === 'en' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                EN
              </button>
              <button 
                onClick={() => onLanguageChange('am')}
                className={`px-3 py-1 rounded-xl text-[10px] font-bold transition-all ${language === 'am' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                አማ
              </button>
            </div>

            <button className="hidden sm:flex p-2.5 hover:bg-gray-100 rounded-2xl text-gray-600 transition-colors">
              <Search className="w-5 h-5 lg:hidden" />
            </button>
            
            <button className="hidden md:flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 rounded-2xl text-gray-700 font-semibold transition-colors">
              <User className="w-5 h-5" />
              <span>{t('nav_signin')}</span>
            </button>

            <button 
              onClick={onOpenCart}
              className="relative p-2.5 bg-gray-900 text-white rounded-2xl hover:bg-red-600 transition-all shadow-lg hover:shadow-red-600/20 active:scale-95"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile Drawer */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-[280px] z-[70] bg-white transition-transform duration-300 ease-out lg:hidden shadow-2xl ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
              <span className="text-xl font-black text-blue-900 leading-none">TotalEnergies</span>
              <span className="text-[10px] font-bold text-red-600 uppercase">Menu</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-2 flex-1">
            <a href="#" className="block px-4 py-3 rounded-xl font-bold text-gray-800 hover:bg-gray-50 hover:text-red-600 transition-colors">{t('nav_home')}</a>
            <a href="#" className="block px-4 py-3 rounded-xl font-bold text-gray-800 hover:bg-gray-50 hover:text-red-600 transition-colors">{t('nav_products')}</a>
            <a href="#" className="block px-4 py-3 rounded-xl font-bold text-gray-800 hover:bg-gray-50 hover:text-red-600 transition-colors">{t('nav_finder')}</a>
            <a href="#" className="block px-4 py-3 rounded-xl font-bold text-gray-800 hover:bg-gray-50 hover:text-red-600 transition-colors">{t('nav_contact')}</a>
          </div>

          <div className="pt-6 border-t">
            <button className="w-full flex items-center justify-center gap-2 bg-blue-900 text-white py-3 rounded-xl font-bold">
              <User className="w-4 h-4" />
              {t('nav_signin')}
            </button>
          </div>
        </div>
      </div>
      
      {/* Spacer for fixed navbar */}
      <div className="h-[72px]"></div>
    </>
  );
};
