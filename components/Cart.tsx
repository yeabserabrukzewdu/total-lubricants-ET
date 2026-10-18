
import React from 'react';
import { CartItem, Language } from '../types';
import { WHATSAPP_NUMBER, TRANSLATIONS, BRANCH_INFO } from '../constants';
import { X, Minus, Plus, ShoppingBag, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  language: Language;
}

export const Cart: React.FC<CartProps> = ({ items, isOpen, onClose, onUpdateQuantity, onRemove, language }) => {
  const t = (key: string) => TRANSLATIONS[language][key] || key;
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleWhatsAppCheckout = () => {
    const greeting = language === 'en' 
      ? '🚀 *New Order Request - TotalEnergies Lubricants*' 
      : '🚀 *አዲስ የትዕዛዝ ጥያቄ - ቶታል ኢነርጂስ ቅባቶች*';
    const branchLabel = language === 'en'
      ? `📍 *Branch:* ${BRANCH_INFO.name} (${BRANCH_INFO.city})`
      : `📍 *ቅርንጫፍ:* ${BRANCH_INFO.name_am} (${BRANCH_INFO.city_am})`;
    const addressLabel = language === 'en'
      ? `🏢 *Address:* ${BRANCH_INFO.address}`
      : `🏢 *አድራሻ:* ${BRANCH_INFO.address_am}`;
    const totalLabel = language === 'en' ? '💰 *Order Total:*' : '💰 *ጠቅላላ ድምር:*';
    const thanks = language === 'en' 
      ? 'Please confirm product availability at Gulele Medhanialem branch for pickup or delivery. Thank you!' 
      : 'እባክዎን በጉለሌ መድኃኔዓለም ቅርንጫፍ የዕቃዎችን መኖር አረጋግጠው ያመቻቹልን። አመሰግናለሁ!';

    const message = `${greeting}\n${branchLabel}\n${addressLabel}\n\n*Items Ordered:*\n` +
      items.map(item => `✅ *${item.product.name}*\n   Qty: ${item.quantity} | Total: ${ (item.product.price * item.quantity).toLocaleString() } ETB`).join('\n\n') +
      `\n\n${totalLabel} ${total.toLocaleString()} ETB\n\n${thanks}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
        {/* Header */}
        <div className="p-6 md:p-8 bg-blue-950 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-black tracking-tight">{t('cart_title')}</h2>
            </div>
            <button onClick={onClose} className="p-2.5 hover:bg-white/10 rounded-2xl transition-colors">
              <X className="w-6 h-6 text-white/80" />
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-200">
            <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
            <span className="font-semibold truncate">
              {language === 'en' ? BRANCH_INFO.name : BRANCH_INFO.name_am} • {BRANCH_INFO.city}
            </span>
          </div>
        </div>

        {/* Branch Notice Banner */}
        <div className="bg-red-50 px-6 py-2.5 border-b border-red-100 flex items-center justify-between text-xs text-red-900 font-semibold">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{t('cart_branch_notice')}</span>
          </div>
          <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-red-200">
            Gulele
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center px-4">
              <div className="bg-gray-50 w-32 h-32 flex items-center justify-center rounded-[2.5rem] mb-8">
                <ShoppingBag className="w-12 h-12 text-gray-200" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('cart_empty')}</h3>
              <button 
                onClick={onClose} 
                className="bg-blue-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg"
              >
                {t('nav_products')}
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-5 group animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="w-24 h-24 bg-gray-50 rounded-2xl p-3 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <img src={item.product.image} className="w-full h-full object-contain" alt="" />
                  </div>
                  <div className="flex-1 flex flex-col py-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors">{item.product.name}</h4>
                      <button onClick={() => onRemove(item.product.id)} className="text-gray-300 hover:text-red-500 p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3">{item.product.category}</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, -1)} 
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:text-red-600 transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, 1)} 
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:text-red-600 transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-black text-lg text-blue-900">{ (item.product.price * item.quantity).toLocaleString() } <span className="text-[10px]">ETB</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-8 border-t border-gray-50 bg-white space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400 font-medium">
                <span>{t('cart_subtotal')}</span>
                <span>{total.toLocaleString()} ETB</span>
              </div>
              <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">{t('cart_total')}</span>
                <span className="text-3xl font-black text-blue-900">{total.toLocaleString()} <span className="text-sm">ETB</span></span>
              </div>
            </div>
            
            <button 
              onClick={handleWhatsAppCheckout}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-5 rounded-[1.5rem] font-bold text-lg shadow-xl shadow-green-200 flex items-center justify-center gap-3 transition-all active:scale-95 group"
            >
              <span>{t('cart_checkout')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
