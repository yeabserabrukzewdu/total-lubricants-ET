
import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { LubricantFinder } from './components/LubricantFinder';
import { PRODUCTS, TRANSLATIONS, BRANCH_INFO, WHATSAPP_NUMBER } from './constants';
import { Product, CartItem, LubricantCategory, Language } from './types';
import { ChevronRight, MapPin, Phone, Clock, ShieldCheck, Truck, ExternalLink, MessageCircle, Navigation, Award, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LubricantCategory | 'All'>('All');
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => TRANSLATIONS[language][key] || key;

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setTimeout(() => setIsCartOpen(true), 200);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const categories: (LubricantCategory | 'All')[] = ['All', ...Object.values(LubricantCategory)];

  return (
    <div className="min-h-screen bg-slate-50/40">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main>
        <Hero language={language} />

        <div className="container mx-auto px-4 -mt-16 md:-mt-24 relative z-20">
          <LubricantFinder language={language} />
        </div>

        {/* Products Section */}
        <section className="container mx-auto px-4 py-20 md:py-28" id="products">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="w-10 h-1 bg-red-600 rounded-full"></span>
                <span className="text-red-600 font-extrabold uppercase tracking-[0.2em] text-xs">
                  {t('section_collection')}
                </span>
                <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-red-200">
                  {language === 'en' ? 'Gulele Medhanialem' : 'ጉለሌ መድኃኔዓለም'}
                </span>
                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {t('price_bulletin')}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-blue-950 leading-tight mb-3">
                {t('section_title')}
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {t('section_subtitle')}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl border border-gray-200/80 shadow-sm self-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 md:px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                    selectedCategory === cat 
                    ? 'bg-blue-950 text-white shadow-md shadow-blue-950/20' 
                    : 'bg-transparent text-gray-500 hover:text-blue-950 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} language={language} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200 shadow-sm">
              <p className="text-gray-400 text-lg font-medium">
                {language === 'en' 
                  ? 'No products found matching your search at Gulele Medhanialem branch.' 
                  : 'በጉለሌ መድኃኔዓለም ቅርንጫፍ በዚህ ፍለጋ የተገኘ ምርት የለም።'}
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} 
                className="mt-4 text-red-600 font-bold hover:underline inline-flex items-center gap-1 text-sm"
              >
                {language === 'en' ? 'Clear all filters' : 'ሁሉንም ማጣሪያዎች አጽዳ'}
              </button>
            </div>
          )}
        </section>

        {/* Dedicated Gulele Medhanialem Branch Spotlight Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 border-y border-gray-200/70 py-20 md:py-28 scroll-mt-28" id="branch-info">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/70 text-red-700 font-bold text-xs uppercase tracking-wider mb-4 border border-red-200">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>{language === 'en' ? BRANCH_INFO.name : BRANCH_INFO.name_am}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight leading-tight mb-4">
                {t('branch_section_title')}
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {t('branch_section_desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Branch Details Card */}
              <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-200 shadow-xl shadow-blue-900/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-8">
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-widest text-red-600">TotalEnergies Station</span>
                      <h3 className="text-2xl md:text-3xl font-black text-blue-950 mt-1">
                        {language === 'en' ? BRANCH_INFO.name : BRANCH_INFO.name_am}
                      </h3>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      {language === 'en' ? 'Open & Ready' : 'ክፍት ነው'}
                    </span>
                  </div>

                  <div className="space-y-6 mb-8">
                    {/* Address item */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">
                          {language === 'en' ? 'Branch Location' : 'የቅርንጫፉ አድራሻ'}
                        </h4>
                        <p className="text-base font-bold text-gray-900 mt-0.5">
                          {language === 'en' ? BRANCH_INFO.address : BRANCH_INFO.address_am}
                        </p>
                        <span className="text-xs text-gray-500">
                          {language === 'en' ? 'Gulele Sub-City, Addis Ababa, Ethiopia' : 'ጉለሌ ክፍለ ከተማ፣ አዲስ አበባ፣ ኢትዮጵያ'}
                        </span>
                      </div>
                    </div>

                    {/* Working hours item */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">
                          {language === 'en' ? 'Working Hours' : 'የስራ ሰዓታት'}
                        </h4>
                        <p className="text-base font-bold text-gray-900 mt-0.5">
                          {language === 'en' ? BRANCH_INFO.working_hours : BRANCH_INFO.working_hours_am}
                        </p>
                        <span className="text-xs text-emerald-600 font-semibold">
                          {language === 'en' ? 'Everyday dispatch & pickup available' : 'የዕለት ተዕለት ርክክብ እና ማድረስ አለ'}
                        </span>
                      </div>
                    </div>

                    {/* Phones item */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">
                          {language === 'en' ? 'Direct Hotline & Orders' : 'ስልክ እና ትዕዛዝ'}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <a 
                            href={`tel:${BRANCH_INFO.phone}`} 
                            className="text-base font-black text-blue-950 hover:text-red-600 transition-colors"
                          >
                            {BRANCH_INFO.phone}
                          </a>
                          <span className="text-gray-300">•</span>
                          <a 
                            href={`tel:${BRANCH_INFO.phone_alt}`} 
                            className="text-sm font-bold text-gray-700 hover:text-red-600 transition-colors"
                          >
                            {BRANCH_INFO.phone_alt}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      language === 'en'
                        ? `Hello TotalEnergies Gulele Medhanialem Branch, I would like to inquire about lubricant products and availability.`
                        : `ሰላም ቶታል ኢነርጂስ ጉለሌ መድኃኔዓለም ቅርንጫፍ፣ ስለ ዘይትና ቅባት ምርቶች ዝርዝር መጠየቅ እፈልጋለሁ።`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-green-200 transition-all active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{language === 'en' ? 'Chat with Gulele Branch' : 'ከጉለሌ ቅርንጫፍ ጋር ይወያዩ'}</span>
                  </a>

                  <a
                    href={BRANCH_INFO.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-950 hover:bg-blue-900 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-blue-950/20 transition-all active:scale-95"
                  >
                    <Navigation className="w-5 h-5 text-red-500" />
                    <span>{language === 'en' ? 'Get Directions on Map' : 'በካርታ አቅጣጫ ይመልከቱ'}</span>
                  </a>
                </div>
              </div>

              {/* Branch Services & Guarantee Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 to-[#002752] text-white rounded-[2.5rem] p-8 md:p-12 shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/15 blur-[80px] -mr-20 -mt-20"></div>
                <div className="relative z-10">
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-red-400 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block mb-4">
                    {language === 'en' ? 'Branch Services' : 'የቅርንጫፉ አገልግሎቶች'}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black mb-6 leading-tight">
                    {language === 'en' 
                      ? 'Why Choose Our Gulele Medhanialem Branch?' 
                      : 'የጉለሌ መድኃኔዓለም ቅርንጫፍን ለምን ይመርጣሉ?'}
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3.5 bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-bold text-sm text-white">
                          {language === 'en' ? '100% Genuine Total Oil Guarantee' : '100% ኦሪጅናል ቶታል ኢነርጂስ ዋስትና'}
                        </h5>
                        <p className="text-xs text-blue-200/80 mt-0.5 leading-relaxed">
                          {language === 'en' 
                            ? 'All products are authentic with factory seals direct from TotalEnergies distribution.' 
                            : 'ሁሉም ምርቶች በቀጥታ ከቶታል ኢነርጂስ የሚመጡ ከፋብሪካ ማኅተም ጋር የቀረቡ ናቸው።'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <Award className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-bold text-sm text-white">
                          {language === 'en' ? 'On-Site Lubricant Consultation' : 'የነፃ ባለሙያ ምክር በቅርንጫፉ'}
                        </h5>
                        <p className="text-xs text-blue-200/80 mt-0.5 leading-relaxed">
                          {language === 'en' 
                            ? 'Our experienced mechanics help select the exact viscosity and oil grade for your vehicle.' 
                            : 'ልምድ ያላቸው ባለሙያዎቻችን ለተሽከርካሪዎ ትክክለኛውን የዘይት ዓይነት እንዲመርጡ ያግዛሉ።'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <Truck className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-bold text-sm text-white">
                          {language === 'en' ? 'Fleet Supply & Fast Addis Dispatch' : 'የጅምላ አቅርቦት እና ፈጣን ማድረስ'}
                        </h5>
                        <p className="text-xs text-blue-200/80 mt-0.5 leading-relaxed">
                          {language === 'en' 
                            ? 'Commercial jerrycans (20L, 25L) and carton orders ready for fleets, trucks and garages.' 
                            : 'ለጭነት መኪኖች፣ ለታክሲዎችና ጋራዦች የ20ሊ እና 25ሊ ጀሪካን የጅምላ አቅርቦት።'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-blue-200 font-medium">
                  <span>📍 Gulele Medhanialem Church Area</span>
                  <span className="font-bold text-white">TotalEnergies Branch</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 py-20" id="contact">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
            {/* Branch Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex flex-col mb-4">
                <span className="text-2xl font-black tracking-tighter text-white leading-none">TotalEnergies</span>
                <span className="text-[10px] uppercase font-black text-red-500 tracking-[0.3em] mt-1">
                  Lubricants
                </span>
                <span className="text-xs font-bold text-blue-300 mt-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                  {language === 'en' ? BRANCH_INFO.name : BRANCH_INFO.name_am}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {language === 'en' 
                  ? 'Official retailer of TotalEnergies lubricants at Gulele Medhanialem, Addis Ababa. Premium engine oils, gear fluids and industrial lubricants.'
                  : 'በጉለሌ መድኃኔዓለም አዲስ አበባ የሚገኘው ይፋዊ የቶታል ኢነርጂስ ቅባቶች ቸርቻሪ። ጥራት ያላቸው የሞተርና የማርሽ ዘይቶች።'}
              </p>
              <div className="text-xs text-slate-400 font-semibold space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  <span>{language === 'en' ? BRANCH_INFO.working_hours : BRANCH_INFO.working_hours_am}</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                {language === 'en' ? 'Quick Links' : 'አቋራጭ አገናኞች'}
              </h4>
              <ul className="space-y-3 text-xs font-bold text-slate-400">
                <li><a href="#" className="hover:text-red-400 flex items-center gap-2 group transition-colors"><ChevronRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-1 transition-transform" /> {t('nav_home')}</a></li>
                <li><a href="#products" className="hover:text-red-400 flex items-center gap-2 group transition-colors"><ChevronRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-1 transition-transform" /> {t('nav_products')}</a></li>
                <li><a href="#finder" className="hover:text-red-400 flex items-center gap-2 group transition-colors"><ChevronRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-1 transition-transform" /> {t('nav_finder')}</a></li>
                <li><a href="#branch-info" className="hover:text-red-400 flex items-center gap-2 group transition-colors"><ChevronRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-1 transition-transform" /> {t('nav_branch')}</a></li>
              </ul>
            </div>

            {/* Branch Contact Info */}
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                {language === 'en' ? 'Gulele Branch Location' : 'የጉለሌ ቅርንጫፍ አድራሻ'}
              </h4>
              <ul className="space-y-3.5 text-xs text-slate-400 font-medium">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{language === 'en' ? BRANCH_INFO.address : BRANCH_INFO.address_am}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <a href={`tel:${BRANCH_INFO.phone}`} className="hover:text-white transition-colors">{BRANCH_INFO.phone}</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <a href={`tel:${BRANCH_INFO.phone_alt}`} className="hover:text-white transition-colors">{BRANCH_INFO.phone_alt}</a>
                </li>
              </ul>
            </div>

            {/* Direct Order / WhatsApp */}
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                {language === 'en' ? 'Direct WhatsApp' : 'በዋትስአፕ ያግኙን'}
              </h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                {language === 'en'
                  ? 'Connect directly with our Gulele Medhanialem branch sales desk for stock inquiries and orders.'
                  : 'የክምችት መረጃዎችንና ትዕዛዞችን በቀጥታ ለጉለሌ መድኃኔዓለም ቅርንጫፍ የሽያጭ ክፍል ይላኩ።'}
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  language === 'en'
                    ? `Hello TotalEnergies Gulele Medhanialem Branch, I would like to place an order.`
                    : `ሰላም ቶታል ኢነርጂስ ጉለሌ መድኃኔዓለም ቅርንጫፍ፣ ትዕዛዝ ማስተላለፍ እፈልጋለሁ።`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-green-900/30 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'en' ? 'Chat on WhatsApp' : 'በዋትስአፕ ይዘዙ'}</span>
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} TotalEnergies Lubricants — {language === 'en' ? BRANCH_INFO.name : BRANCH_INFO.name_am}. All rights reserved.</p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <span>{language === 'en' ? 'Gulele Medhanialem, Addis Ababa' : 'ጉለሌ መድኃኔዓለም፣ አዲስ አበባ'}</span>
              <span>•</span>
              <span className="text-red-400 font-bold">{language === 'en' ? 'Genuine Guaranteed' : '100% ኦሪጅናል'}</span>
            </p>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        language={language}
      />
    </div>
  );
};

export default App;
