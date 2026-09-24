import React, { useState } from 'react';
import type { Currency, JawType, PageRoute } from './types/dental';
import { getProcedures, CURRENCY_CONFIG, RESORT_HOTELS, DENTAL_FORMULA } from './data/dentalData';

import { LanguageProvider, useLanguage } from './context/LanguageContext';

// Компоненты макета и навигации
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CatalogPage } from './components/catalog/CatalogPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SosWidget } from './components/features/SosWidget';
import { CustomSelect } from './components/ui/CustomSelect';
import { IntroAnimation } from './components/ui/IntroAnimation';

// Клинические модули
import { ArbitrageCalculator } from './components/features/ArbitrageCalculator';
import { DigitalSmileDropzone } from './components/features/DigitalSmileDropzone';
import { VacationTimeline } from './components/features/VacationTimeline';
import { EnamelInspector } from './components/features/EnamelInspector';
import { Odontogram } from './components/landing/Odontogram';

import { 
  ChevronRight, Car, 
  ShieldCheck, MapPin, Clock, Check, 
  Compass, Award
} from 'lucide-react';

function DentalLoungeApp() {
  const { t, lang, setLang } = useLanguage();
  const [showIntro, setShowIntro] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [currency, setCurrency] = useState<Currency>('EUR');

  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([14, 13, 12, 11, 21, 22, 23, 24]);
  const [activeJaw, setActiveJaw] = useState<JawType>('upper');

  // Динамические процедуры в зависимости от выбранного языка (RU / EN)
  const proceduresList = getProcedures(lang);
  const [currentProcedure, setCurrentProcedure] = useState(proceduresList[0]);

  const [flightHours, setFlightHours] = useState<number>(48);
  const [selectedHotelName, setSelectedHotelName] = useState(RESORT_HOTELS[0].name);

  const selectedHotel = RESORT_HOTELS.find(h => h.name === selectedHotelName) || RESORT_HOTELS[0];

  const hotelOptions = RESORT_HOTELS.map(h => ({
    value: h.name,
    label: h.name,
    sublabel: `${h.district} • ${h.eta}`
  }));

  const toggleTooth = (fdi: number) => {
    setSelectedTeeth(prev => 
      prev.includes(fdi) ? prev.filter(id => id !== fdi) : [...prev, fdi].sort((a, b) => a - b)
    );
  };

  const handleSelectPreset = (type: 'smile' | 'upper' | 'all' | 'clear') => {
    if (type === 'smile') {
      setSelectedTeeth([14, 13, 12, 11, 21, 22, 23, 24]);
    } else if (type === 'upper') {
      setSelectedTeeth(DENTAL_FORMULA.filter(t => t.jaw === 'upper').map(t => t.fdi));
    } else if (type === 'all') {
      setSelectedTeeth(DENTAL_FORMULA.map(t => t.fdi));
    } else {
      setSelectedTeeth([]);
    }
  };

  const currentRate = CURRENCY_CONFIG[currency].rate;
  const unitPrice = Math.round(currentProcedure.basePriceEUR * currentRate);
  const totalPrice = unitPrice * selectedTeeth.length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1D1B] font-sans antialiased flex flex-col justify-between selection:bg-[#B89369]/20">
      
      {/* 0. Чистое оптическое интро (круг + лазер + гравировка AURA) */}
      {showIntro && (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      )}

      {/* 1. Навигационный хедер с переключением языков и валют */}
      <Header 
        currency={currency} 
        setCurrency={setCurrency} 
        lang={lang}
        setLang={setLang}
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />

      <main className="flex-grow">
        {currentPage === 'admin' ? (
          <AdminDashboard />
        ) : currentPage === 'catalog' ? (
          <CatalogPage currency={currency} />
        ) : (
          <>
            {/* HERO-СЕКЦИЯ */}
            <section className="relative pt-12 md:pt-16 pb-20 px-6 lg:px-8 overflow-hidden">
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B89369]/8 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                <div className="lg:col-span-7 space-y-8">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-stone-200/90 text-stone-800 text-xs font-mono shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#B89369] animate-pulse" />
                    <span className="font-semibold text-[#96744C]">AURA Dental Lounge</span>
                    <span className="text-stone-300">•</span>
                    <span className="text-stone-500 font-sans">{t.hero.badge}</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-950 font-normal leading-[1.12] tracking-tight">
                    {t.hero.title1} <br />
                    <span className="italic font-serif text-[#B89369]">{t.hero.titleGold}</span> {t.hero.title2}
                  </h1>

                  <p className="text-stone-600 text-base md:text-lg max-w-xl font-normal leading-relaxed">
                    {t.hero.desc}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href="#calculator"
                      className="px-8 py-4 rounded-full bg-stone-950 hover:bg-[#B89369] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-stone-950/15 flex items-center gap-2.5 active:scale-[0.98]"
                    >
                      <span>{t.hero.ctaPrimary}</span>
                      <ChevronRight className="w-4 h-4 text-[#B89369]" />
                    </a>

                    <button
                      onClick={() => setCurrentPage('catalog')}
                      className="px-8 py-4 rounded-full bg-white border border-stone-300/90 text-stone-900 text-xs font-bold uppercase tracking-wider hover:bg-stone-50 hover:border-stone-400 transition-all duration-200 shadow-xs flex items-center gap-2 active:scale-[0.98]"
                    >
                      <Compass className="w-4 h-4 text-[#B89369]" />
                      <span>{t.hero.ctaCatalog}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200">
                    <div>
                      <p className="text-3xl font-sans font-extrabold tracking-tight text-stone-950">{t.hero.m1Val}</p>
                      <p className="text-xs text-stone-500 font-medium mt-1 leading-snug">{t.hero.m1Label}</p>
                    </div>
                    <div>
                      <p className="text-3xl font-sans font-extrabold tracking-tight text-stone-950">{t.hero.m2Val}</p>
                      <p className="text-xs text-stone-500 font-medium mt-1 leading-snug">{t.hero.m2Label}</p>
                    </div>
                    <div>
                      <p className="text-3xl font-sans font-extrabold tracking-tight text-stone-950">{t.hero.m3Val}</p>
                      <p className="text-xs text-stone-500 font-medium mt-1 leading-snug">{t.hero.m3Label}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="relative mx-auto max-w-md">
                    <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] relative">
                      <img 
                        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80" 
                        alt="AURA Dental Lounge Interior" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent flex flex-col justify-end p-6 text-white">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#B89369] font-bold">
                          {t.hero.suiteBadge}
                        </span>
                        <p className="text-sm font-serif italic mt-0.5 text-stone-200">
                          {t.hero.suiteCaption}
                        </p>
                      </div>
                    </div>

                    <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-stone-200/80 flex items-center space-x-3.5 max-w-xs">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-stone-200 flex items-center justify-center text-[#B89369] flex-shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex text-amber-500 text-xs">★★★★★</div>
                        <p className="text-xs font-bold text-stone-900 mt-0.5 leading-snug">
                          {t.hero.reviewQuote}
                        </p>
                        <p className="text-[10px] text-stone-400 font-mono mt-0.5">{t.hero.reviewAuthor}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ЭКОНОМИЧЕСКИЙ АРБИТРАЖ */}
            <section id="arbitrage" className="py-16 px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <ArbitrageCalculator />
              </div>
            </section>

            {/* АРХИТЕКТОР УЛЫБКИ */}
            <section id="calculator" className="py-20 px-6 lg:px-8 bg-white border-y border-stone-200">
              <div className="max-w-6xl mx-auto space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B89369] font-bold">
                    {t.odontogram.eyebrow}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif text-stone-950 font-normal">
                    {t.odontogram.title}
                  </h2>
                  <p className="text-stone-600 text-sm font-normal">
                    {t.odontogram.desc}
                  </p>
                </div>

                <div className="bg-[#FAF7F2] border border-stone-200 rounded-3xl p-6 md:p-8 shadow-xs space-y-8">
                  <Odontogram
                    teeth={DENTAL_FORMULA}
                    activeJaw={activeJaw}
                    setActiveJaw={setActiveJaw}
                    selectedTeeth={selectedTeeth}
                    onToggleTooth={toggleTooth}
                    onSelectPreset={handleSelectPreset}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-200">
                    {proceduresList.map(proc => {
                      const isSelected = currentProcedure.id === proc.id;
                      return (
                        <div
                          key={proc.id}
                          onClick={() => setCurrentProcedure(proc)}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                            isSelected 
                              ? 'bg-white border-[#B89369] shadow-md ring-2 ring-[#B89369]/20' 
                              : 'bg-white/80 border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-lg font-bold text-stone-950">{proc.title}</h4>
                            {isSelected && (
                              <span className="p-1 rounded-full bg-[#B89369] text-white">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-600 mt-1.5 font-normal leading-relaxed">{proc.subtitle}</p>
                          <div className="mt-4 pt-3 border-t border-stone-100 flex items-baseline justify-between">
                            <span className="text-xs font-mono text-stone-500">{t.odontogram.perUnit}</span>
                            <span className="text-base font-bold text-stone-950 font-sans">
                              {Math.round(proc.basePriceEUR * currentRate)} {CURRENCY_CONFIG[currency].symbol}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-stone-950 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="space-y-1 text-center md:text-left">
                      <span className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                        {t.odontogram.summaryLabel} ({selectedTeeth.length} {t.odontogram.units}):
                      </span>
                      <div className="text-3xl md:text-4xl font-sans font-bold text-white flex items-baseline justify-center md:justify-start gap-2">
                        <span>{totalPrice.toLocaleString()} {CURRENCY_CONFIG[currency].symbol}</span>
                        <span className="text-xs font-mono text-[#B89369] font-normal">{t.odontogram.includingTransfer}</span>
                      </div>
                      <p className="text-xs text-stone-400 font-normal">
                        {currentProcedure.warranty}
                      </p>
                    </div>

                    <div className="flex items-center gap-8 text-xs font-mono border-y md:border-y-0 md:border-l border-stone-800 py-3 md:py-0 md:pl-8">
                      <div>
                        <span className="text-stone-400 block">{t.odontogram.stayLabel}</span>
                        <span className="text-emerald-400 font-bold text-sm">
                          {currentProcedure.daysRequired} {t.odontogram.nightsUnit}
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-400 block">{t.odontogram.visitsLabel}</span>
                        <span className="text-white font-bold text-sm">
                          {currentProcedure.visits} {t.odontogram.visitsUnit}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/201000000000?text=${encodeURIComponent(`AURA Dental reservation: ${currentProcedure.title}, units:${selectedTeeth.length}. Total: ${totalPrice}${currency}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 rounded-full bg-[#B89369] hover:bg-[#9E7A52] text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      {t.odontogram.bookDates} <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </div>
            </section>

            {/* ТАЙМЛАЙН ОТПУСКА */}
            <section id="timeline" className="py-20 px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <VacationTimeline />
              </div>
            </section>

            {/* ОПТИКА ЭМАЛИ */}
            <section id="enamel" className="py-20 px-6 lg:px-8 bg-stone-100/70 border-y border-stone-200">
              <div className="max-w-6xl mx-auto">
                <EnamelInspector />
              </div>
            </section>

            {/* ДИСТАНЦИОННЫЙ РАЗБОР */}
            <section id="consult" className="py-20 px-6 lg:px-8">
              <DigitalSmileDropzone />
            </section>

            {/* БАРО-БЕЗОПАСНОСТЬ */}
            <section id="safety" className="py-20 px-6 lg:px-8 bg-[#181A19] text-white">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B89369] font-bold">
                    {t.safety.eyebrow}
                  </span>
                  <h3 className="text-3xl font-serif font-normal">{t.safety.title}</h3>
                  <p className="text-stone-400 text-sm max-w-xl mx-auto font-normal leading-relaxed">
                    {t.safety.desc}
                  </p>
                </div>

                <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 md:p-8 space-y-6">
                  <div>
                    <div className="flex justify-between items-baseline text-xs font-mono mb-2">
                      <span className="text-stone-400">{t.safety.hoursToFlight}</span>
                      <span className="text-[#B89369] font-bold text-base font-sans">{flightHours} {t.safety.hoursUnit}</span>
                    </div>
                    <input 
                      type="range" 
                      min="12" 
                      max="96" 
                      value={flightHours}
                      onChange={e => setFlightHours(Number(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                  </div>

                  <div className={`p-4 rounded-2xl border text-xs font-mono flex items-start gap-3.5 ${
                    flightHours < 36 
                      ? 'bg-amber-950/40 border-amber-600/50 text-amber-200' 
                      : 'bg-emerald-950/40 border-emerald-600/50 text-emerald-200'
                  }`}>
                    <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#B89369]" />
                    <div>
                      <p className="font-bold uppercase">
                        {flightHours < 36 ? t.safety.restrictedTitle : t.safety.allowedTitle}
                      </p>
                      <p className="font-sans font-normal mt-1 text-stone-300 leading-relaxed">
                        {flightHours < 36 ? t.safety.restrictedDesc : t.safety.allowedDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* КОНСЬЕРЖ-ТРАНСФЕР */}
            <section id="concierge" className="py-20 px-6 lg:px-8 bg-white border-b border-stone-200">
              <div className="max-w-4xl mx-auto">
                <div className="border border-stone-200 bg-[#FAF7F2] rounded-3xl p-8 md:p-10 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  <div className="md:col-span-7 space-y-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#B89369] font-bold">
                      {t.concierge.eyebrow}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif text-stone-950">
                      {t.concierge.title}
                    </h3>
                    <p className="text-stone-600 text-sm font-normal leading-relaxed">
                      {t.concierge.desc}
                    </p>

                    <div className="pt-2 space-y-2">
                      <label className="text-xs font-mono uppercase text-stone-500 block font-medium">
                        {t.concierge.selectLabel}
                      </label>
                      <CustomSelect
                        value={selectedHotelName}
                        options={hotelOptions}
                        onChange={setSelectedHotelName}
                      />
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono pt-2">
                      <span className="text-stone-600 flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#B89369]" /> {t.concierge.districtLabel} {selectedHotel.district}
                      </span>
                      <span className="text-stone-600 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-stone-400" /> {t.concierge.etaLabel} ≈ {selectedHotel.eta}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#B89369]/15 text-[#B89369] flex items-center justify-center mx-auto">
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-stone-950">{t.concierge.cardTitle}</h4>
                      <p className="text-xs text-stone-500 mt-1 font-normal">{t.concierge.cardDesc}</p>
                    </div>
                    <a
                      href={`https://wa.me/201000000000?text=${encodeURIComponent(`VIP Shuttle pickup request: ${selectedHotel.name}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3.5 bg-stone-950 hover:bg-[#B89369] text-white rounded-xl text-xs font-bold uppercase tracking-wider block transition-all shadow-md active:scale-[0.98]"
                    >
                      {t.concierge.cardBtn}
                    </a>
                  </div>

                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
      <SosWidget />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <DentalLoungeApp />
    </LanguageProvider>
  );
}