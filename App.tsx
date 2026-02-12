
import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { LubricantFinder } from './components/LubricantFinder';
import { PRODUCTS, TRANSLATIONS } from './constants';
import { Product, CartItem, LubricantCategory, Language } from './types';
import { ChevronRight } from 'lucide-react';

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
    <div className="min-h-screen">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main>
        <Hero language={language} />

        <div className="container mx-auto px-4 -mt-24 relative z-20">
          <LubricantFinder language={language} />
        </div>

        <section className="container mx-auto px-4 py-24 md:py-32" id="products">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-1 bg-red-600"></span>
                <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-xs">{t('section_collection')}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-blue-900 leading-tight">{t('section_title')}</h2>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-3 bg-gray-50/50 p-2 rounded-[2rem] border border-gray-100 self-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 md:px-6 py-3 rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 ${
                    selectedCategory === cat 
                    ? 'bg-blue-900 text-white shadow-xl shadow-blue-900/20' 
                    : 'bg-transparent text-gray-500 hover:text-blue-900 hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} language={language} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-xl font-medium">No results found for your specific search.</p>
              <button onClick={() => {setSearchQuery(''); setSelectedCategory('All')}} className="mt-4 text-red-600 font-bold hover:underline">Clear all filters</button>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
            <div className="lg:col-span-1">
              <div className="flex flex-col mb-8">
                <span className="text-2xl font-black tracking-tighter text-blue-950 leading-none">TotalEnergies</span>
                <span className="text-[10px] uppercase font-bold text-red-600 tracking-[0.3em]">Lubricants</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">A global energy player that produces and markets fuels, natural gas and low-carbon electricity.</p>
            </div>
            
            <div>
              <h4 className="text-blue-900 font-black text-xs uppercase tracking-widest mb-8">Quick Links</h4>
              <ul className="space-y-4 text-sm font-semibold text-gray-500">
                <li><a href="#" className="hover:text-red-600 flex items-center gap-2 group"><ChevronRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform" /> {t('nav_products')}</a></li>
                <li><a href="#" className="hover:text-red-600 flex items-center gap-2 group"><ChevronRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform" /> {t('nav_finder')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-blue-900 font-black text-xs uppercase tracking-widest mb-8">Support Center</h4>
              <ul className="space-y-4 text-sm font-semibold text-gray-500">
                <li><a href="#" className="hover:text-red-600 flex items-center gap-2 group"><ChevronRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform" /> {t('nav_contact')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-blue-900 font-black text-xs uppercase tracking-widest mb-8">Get In Touch</h4>
              <button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-100 transition-all active:scale-95">
                Chat on WhatsApp
              </button>
            </div>
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
