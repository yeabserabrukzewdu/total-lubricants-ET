
import React from 'react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  language: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, language }) => {
  const t = (key: string) => TRANSLATIONS[language][key] || key;

  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-red-200 hover:shadow-[0_20px_50px_rgba(237,28,36,0.12)] transition-all duration-500 flex flex-col h-full relative">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-gray-50 to-white p-6 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            // fallback placeholder if image doesn't render
            const target = e.currentTarget;
            target.onerror = null;
            target.src = 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=500&auto=format&fit=crop&q=60';
          }}
        />
        {product.viscosity && (
          <div className="absolute top-4 left-4 bg-blue-950 text-white text-[10px] font-black px-2.5 py-1 rounded-xl shadow-md">
            {product.viscosity}
          </div>
        )}

        <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-sm text-white text-[9px] font-extrabold px-2 py-0.5 rounded-lg shadow-sm flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          <span>{language === 'en' ? 'Gulele Stock' : 'ጉለሌ ክምችት'}</span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</span>
        </div>
        <h3 className="text-base md:text-lg font-black text-gray-900 mb-2.5 leading-snug group-hover:text-blue-900 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex flex-wrap gap-1.5 mb-5">
          {product.specs.slice(0, 2).map((spec, i) => (
            <span key={i} className="text-[10px] font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
              {spec}
            </span>
          ))}
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50/60 px-2 py-1 rounded-lg border border-emerald-100">
            {language === 'en' ? '100% Genuine' : 'ኦሪጅናል'}
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{t('price_label')}</span>
            <span className="text-xl font-black text-blue-950">
              {product.price.toLocaleString()} <span className="text-[11px] font-bold text-red-600">ETB</span>
            </span>
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-gray-950 hover:bg-red-600 text-white px-4 py-2.5 rounded-2xl text-xs md:text-sm font-black transition-all shadow-md active:scale-95"
          >
            {t('add_to_cart')}
          </button>
        </div>
      </div>
    </div>
  );
};
