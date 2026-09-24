import React, { useState } from 'react';
import type { Currency, CatalogCategory } from '../../types/dental';
import { getCatalogProcedures } from '../../data/catalogData';
import { CURRENCY_CONFIG } from '../../data/dentalData';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Clock, Calendar, ShieldCheck, Plane, 
  ChevronRight, Search, Sparkles 
} from 'lucide-react';

interface Props {
  currency: Currency;
}

export const CatalogPage: React.FC<Props> = ({ currency }) => {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CatalogCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentRate = CURRENCY_CONFIG[currency].rate;
  const currencySymbol = CURRENCY_CONFIG[currency].symbol;

  // Загружаем процедуры на текущем языке
  const procedures = getCatalogProcedures(lang);

  const filteredProcedures = procedures.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryTabs: { id: CatalogCategory; label: string }[] = [
    { id: 'all', label: t.catalog.tabs.all },
    { id: 'aesthetic', label: t.catalog.tabs.aesthetic },
    { id: 'implants', label: t.catalog.tabs.implants },
    { id: 'spa', label: t.catalog.tabs.spa },
    { id: 'microscope', label: t.catalog.tabs.microscope }
  ];

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto space-y-10 font-sans">
      
      {/* 1. Заголовок каталога */}
      <div className="border-b border-stone-300 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B89369] font-bold">
            {t.catalog.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-stone-950 font-normal tracking-tight">
            {t.catalog.title}
          </h2>
          <p className="text-stone-600 text-sm max-w-2xl font-normal leading-relaxed">
            {t.catalog.desc}
          </p>
        </div>

        {/* Поиск */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.catalog.searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 bg-white border border-stone-300 rounded-2xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#B89369] shadow-xs font-medium"
          />
        </div>
      </div>

      {/* 2. Категории фильтров */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        {categoryTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2.5 rounded-xl transition-all duration-200 ${
              activeCategory === tab.id
                ? 'bg-stone-950 text-white shadow-md'
                : 'bg-white border border-stone-300 text-stone-700 hover:border-stone-500 hover:text-stone-950'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Сетка процедур */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProcedures.map(proc => {
          const unitPrice = Math.round(proc.basePriceEUR * currentRate);
          const ukPrice = Math.round(proc.ukAvgPriceEUR * currentRate);

          const whatsappMessage = lang === 'en'
            ? `Hello! I would like to book a slot for: ${proc.title}. Estimated fee: ${unitPrice} ${currency}.`
            : `Здравствуйте! Меня интересует процедура из каталога: ${proc.title}. Стоимость: ${unitPrice} ${currency}.`;

          return (
            <div 
              key={proc.id}
              className="bg-white border border-stone-300/90 rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#B89369] transition-all duration-300 shadow-xs group"
            >
              {/* Фотография с бейджами категории и допуска к полету */}
              <div className="h-48 w-full overflow-hidden relative border-b border-stone-200">
                <img 
                  src={proc.imageUrl} 
                  alt={proc.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-white font-bold uppercase tracking-wider">
                  {proc.categoryLabel}
                </div>
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-emerald-800 font-bold flex items-center gap-1 shadow-xs">
                  <Plane className="w-3 h-3" /> {t.catalog.flightPrefix}: {proc.flightClearanceHours} {lang === 'en' ? 'h' : 'ч'}
                </div>
              </div>

              {/* Тело карточки */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-bold text-stone-950 leading-snug">
                    {proc.title}
                  </h3>

                  <p className="text-xs text-stone-600 font-normal leading-relaxed">
                    {proc.description}
                  </p>

                  <div className="text-[11px] font-mono text-stone-700 bg-[#FAF7F2] p-3 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider mb-0.5">
                      {t.catalog.materialLabel}
                    </span>
                    <span className="font-semibold text-stone-900">{proc.material}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proc.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-stone-100 text-stone-700 border border-stone-200 px-2 py-0.5 rounded font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-stone-200 mt-4">
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-stone-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B89369]" />
                      <span>{t.catalog.vacationLabel} {proc.daysInResort} {t.catalog.daysUnit}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#B89369]" />
                      <span>{t.catalog.visitsLabel} {proc.visitsRequired}</span>
                    </div>
                  </div>

                  {/* Сравнение цен */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200 flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-stone-400 block line-through">
                        UK / EU: ~{ukPrice.toLocaleString()} {currencySymbol}
                      </span>
                      <span className="text-xs font-mono text-[#B89369] font-bold">AURA Lounge:</span>
                    </div>
                    <span className="text-3xl font-sans font-extrabold text-stone-950 tracking-tight">
                      {unitPrice.toLocaleString()} {currencySymbol}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/201000000000?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 bg-stone-950 hover:bg-[#B89369] text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
                  >
                    <span>{t.catalog.bookSlot}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>

                  <div className="flex items-center justify-center gap-1 text-[11px] font-mono text-stone-500 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{proc.warranty}</span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 4. Нижний баннер индивидуального протокола */}
      <div className="p-8 rounded-3xl bg-stone-900 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl border border-stone-800">
        <div className="space-y-1.5 max-w-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B89369] font-bold">
            {t.catalog.bannerEyebrow}
          </span>
          <h3 className="text-xl md:text-2xl font-serif font-normal">
            {t.catalog.bannerTitle}
          </h3>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            {t.catalog.bannerDesc}
          </p>
        </div>

        <a
          href="https://wa.me/201000000000"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3.5 rounded-full bg-[#B89369] hover:bg-[#9E7A52] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md whitespace-nowrap flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.catalog.bannerBtn}</span>
        </a>
      </div>

    </div>
  );
};