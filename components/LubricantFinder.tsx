
import React, { useState } from 'react';
import { getLubricantRecommendation } from '../services/geminiService';
import { RecommendationResult, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Sparkles, Car, Gauge, Wind } from 'lucide-react';

interface LubricantFinderProps {
  language: Language;
}

export const LubricantFinder: React.FC<LubricantFinderProps> = ({ language }) => {
  const [carModel, setCarModel] = useState('');
  const [mileage, setMileage] = useState('');
  const [conditions, setConditions] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);

  const t = (key: string) => TRANSLATIONS[language][key] || key;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!carModel || !mileage) return;
    setLoading(true);
    try {
      const res = await getLubricantRecommendation(carModel, mileage, conditions);
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#001e3c] to-[#004a99] rounded-[2.5rem] p-6 md:p-12 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 blur-[100px] -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 blur-[80px] -ml-20 -mb-20"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-200 font-bold text-[10px] uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3 text-blue-300" />
            AI Expert Support
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{t('finder_title')}</h2>
          <p className="text-blue-100/70 mb-10 text-lg leading-relaxed max-w-lg">
            {t('finder_desc')}
          </p>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-blue-300/80 mb-2.5 ml-1">{t('finder_label_car')}</label>
                <div className="relative group">
                  <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/50 group-focus-within:text-red-400 transition-colors" />
                  <input 
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    placeholder={t('finder_placeholder_car')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500/50 transition-all placeholder:text-blue-300/30"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-blue-300/80 mb-2.5 ml-1">{t('finder_label_mileage')}</label>
                <div className="relative group">
                  <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/50 group-focus-within:text-red-400 transition-colors" />
                  <input 
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder={t('finder_placeholder_mileage')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500/50 transition-all placeholder:text-blue-300/30"
                  />
                </div>
              </div>
            </div>
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-blue-300/80 mb-2.5 ml-1">{t('finder_label_conditions')}</label>
              <div className="relative group">
                <Wind className="absolute left-4 top-5 w-5 h-5 text-blue-300/50 group-focus-within:text-red-400 transition-colors" />
                <textarea 
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                  placeholder={t('finder_placeholder_conditions')}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500/50 transition-all h-32 resize-none placeholder:text-blue-300/30"
                />
              </div>
            </div>
            <button 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 py-5 rounded-2xl font-black text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-2xl shadow-red-900/40 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === 'en' ? 'Processing...' : 'በማቀናበር ላይ...'}
                </>
              ) : t('finder_btn')}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-[400px] flex items-center">
          <div className="w-full relative">
            {result ? (
              <div className="bg-white rounded-[2rem] p-8 text-blue-900 shadow-2xl animate-in zoom-in slide-in-from-right-10 duration-500">
                <div className="bg-red-600 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg inline-block mb-6 text-white tracking-widest">AI Result</div>
                <h4 className="text-2xl font-black mb-4 leading-tight">{result.recommendedProduct}</h4>
                <div className="w-full h-1 bg-gray-100 rounded-full mb-6 overflow-hidden">
                  <div className="w-full h-full bg-red-600 animate-in slide-in-from-left duration-1000"></div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 italic">"{result.reasoning}"</p>
                <button 
                  onClick={() => setResult(null)}
                  className="w-full py-3 rounded-xl border-2 border-blue-900/10 hover:bg-blue-900 hover:text-white font-bold transition-all"
                >
                  {language === 'en' ? 'Start Over' : 'እንደገና ጀምር'}
                </button>
              </div>
            ) : (
              <div className="text-center bg-white/5 border-2 border-dashed border-white/20 rounded-[2.5rem] p-12 w-full flex flex-col items-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <Sparkles className="w-10 h-10 text-blue-300/30" />
                </div>
                <p className="text-blue-300/50 text-sm font-semibold max-w-[200px]">{language === 'en' ? 'Enter vehicle details to unlock AI recommendation' : 'የተሽከርካሪ ዝርዝሮችን ያስገቡ'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
