import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Eye, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export const EnamelInspector: React.FC = () => {
  const { t } = useLanguage();
  const [isPolarized, setIsPolarized] = useState(false);

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-10 shadow-sm space-y-8 font-sans">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B89369] font-bold">
            {t.enamel.eyebrow}
          </span>
          <h3 className="text-2xl md:text-3xl font-serif text-stone-900 mt-1">
            {t.enamel.title}
          </h3>
        </div>

        {/* Переключатель спектра */}
        <div className="flex items-center bg-[#FAF7F2] p-1 rounded-2xl border border-stone-200 text-xs font-mono">
          <button
            type="button"
            onClick={() => setIsPolarized(false)}
            className={`px-4 py-2 rounded-xl transition-all ${
              !isPolarized 
                ? 'bg-stone-900 text-white font-bold shadow-sm' 
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            {t.enamel.btnNatural}
          </button>
          <button
            type="button"
            onClick={() => setIsPolarized(true)}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              isPolarized 
                ? 'bg-[#B89369] text-white font-bold shadow-sm' 
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.enamel.btnPolarized}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Интерактивное макро-фото с переключением фильтра */}
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border-4 border-[#FAF7F2] shadow-xl group">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80"
              alt="Dental Macro Photography"
              style={{
                filter: isPolarized 
                  ? 'contrast(160%) saturate(140%) brightness(95%) hue-rotate(5deg)' 
                  : 'contrast(105%) brightness(102%)',
                transition: 'filter 0.5s ease-in-out'
              }}
              className="w-full h-full object-cover select-none"
            />
            
            <div className="absolute bottom-4 left-4 right-4 bg-stone-950/80 backdrop-blur-md px-4 py-2.5 rounded-2xl text-white text-xs font-mono flex items-center justify-between">
              <span>{isPolarized ? t.enamel.modePolarized : t.enamel.modeNatural}</span>
              <span className="text-[#B89369] font-bold">5000K CRI 98</span>
            </div>
          </div>
        </div>

        {/* Клинические спецификации биомиметики */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200 space-y-1">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-mono">
              <Layers className="w-3.5 h-3.5 text-[#B89369]" />
              <span>{t.enamel.spec1Title}</span>
            </div>
            <p className="text-sm font-bold text-stone-950 font-serif">{t.enamel.spec1Value}</p>
            <p className="text-xs text-stone-600 leading-relaxed font-light">{t.enamel.spec1Desc}</p>
          </div>

          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200 space-y-1">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89369]" />
              <span>{t.enamel.spec2Title}</span>
            </div>
            <p className="text-sm font-bold text-stone-950 font-serif">{t.enamel.spec2Value}</p>
            <p className="text-xs text-stone-600 leading-relaxed font-light">{t.enamel.spec2Desc}</p>
          </div>

          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200 space-y-1">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#B89369]" />
              <span>{t.enamel.spec3Title}</span>
            </div>
            <p className="text-sm font-bold text-stone-950 font-serif">{t.enamel.spec3Value}</p>
            <p className="text-xs text-stone-600 leading-relaxed font-light">{t.enamel.spec3Desc}</p>
          </div>
        </div>

      </div>

    </div>
  );
};