
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
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-red-100 hover:shadow-[0_20px_50px_rgba(237,28,36,0.1)] transition-all duration-500 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-gray-50 to-white p-8">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {product.viscosity && (
          <div className="absolute top-5 left-5 bg-blue-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg">
            {product.viscosity}
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-900 transition-colors">{product.name}</h3>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {product.specs.slice(0, 2).map((spec, i) => (
            <span key={i} className="text-[10px] font-semibold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase">{t('price_label')}</span>
            <span className="text-xl font-black text-blue-900">{product.price.toLocaleString()} <span className="text-[10px]">ETB</span></span>
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-gray-900 hover:bg-red-600 text-white px-5 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg active:scale-95"
          >
            {t('add_to_cart')}
          </button>
        </div>
      </div>
    </div>
  );
};
