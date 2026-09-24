import React from 'react';
import type { Currency, PageRoute, Language } from '../../types/dental';
import { TRANSLATIONS } from '../../data/translations';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';

interface Props {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  lang: Language;
  setLang: (l: Language) => void;
  currentPage: PageRoute;
  setCurrentPage: (p: PageRoute) => void;
}

export const Header: React.FC<Props> = ({
  currency,
  setCurrency,
  lang,
  setLang,
  currentPage,
  setCurrentPage
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">
      
      {/* 1. Верхний информационный бар */}
      <div className="bg-[#191B1A] text-stone-300 text-xs py-2 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between font-mono">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t.topBar.seaTemp}
            </span>
            <span className="text-stone-600 hidden sm:inline">•</span>
            <span className="text-stone-400 hidden sm:inline text-[11px]">
              {t.topBar.shuttleActive}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            
            {/* Переключатель языка (RU / EN) */}
            <div className="flex items-center bg-stone-900 rounded-lg p-0.5 border border-stone-700">
              {(['ru', 'en'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase transition-all ${
                    lang === l 
                      ? 'bg-[#B89369] text-white shadow-sm' 
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Переключатель валют */}
            <div className="flex items-center bg-stone-900 rounded-lg p-0.5 border border-stone-700">
              {(['EUR', 'USD', 'GBP', 'EGP'] as Currency[]).map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                    currency === c 
                      ? 'bg-[#B89369] text-white shadow-sm' 
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <a 
              href="https://wa.me/201000000000" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-[#B89369] hover:text-[#d3ad82] font-semibold text-[11px] transition-colors"
            >
              {t.topBar.whatsappSos} <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Основная навигация */}
      <header className="py-3.5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between gap-6">
          
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3.5 focus:outline-none group text-left flex-shrink-0"
          >
            <span className="font-serif text-3xl font-bold tracking-tight text-stone-950 group-hover:text-[#B89369] transition-colors">
              AURA
            </span>
            <div className="h-7 w-[1.5px] bg-stone-300 hidden sm:block" />
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-[#B89369]">
                Dental Lounge
              </span>
              <span className="text-[9px] font-mono tracking-wider uppercase text-stone-500 mt-0.5">
                Sharm El Sheikh
              </span>
            </div>
          </button>

          <nav className="hidden xl:flex items-center space-x-1.5 text-xs font-medium text-stone-700">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`px-3.5 py-2 rounded-full transition-all ${
                currentPage === 'home' 
                  ? 'bg-stone-900 text-white shadow-sm' 
                  : 'hover:bg-stone-200/60 hover:text-stone-950'
              }`}
            >
              {t.nav.home}
            </button>

            <button 
              onClick={() => setCurrentPage('catalog')}
              className={`px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all ${
                currentPage === 'catalog' 
                  ? 'bg-stone-900 text-white shadow-sm' 
                  : 'hover:bg-stone-200/60 hover:text-stone-950'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#B89369]" /> {t.nav.catalog}
            </button>

            {currentPage === 'home' && (
              <>
                <a href="#arbitrage" className="px-3 py-2 rounded-full hover:bg-stone-200/60 hover:text-stone-950 transition-all">
                  {t.nav.arbitrage}
                </a>
                <a href="#calculator" className="px-3 py-2 rounded-full hover:bg-stone-200/60 hover:text-stone-950 transition-all">
                  {t.nav.calculator}
                </a>
                <a href="#timeline" className="px-3 py-2 rounded-full hover:bg-stone-200/60 hover:text-stone-950 transition-all">
                  {t.nav.timeline}
                </a>
                <a href="#safety" className="px-3 py-2 rounded-full hover:bg-stone-200/60 hover:text-stone-950 transition-all">
                  {t.nav.safety}
                </a>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-3 flex-shrink-0">
            {currentPage === 'home' ? (
              <button 
                onClick={() => setCurrentPage('catalog')}
                className="px-5 py-2.5 rounded-full bg-stone-950 hover:bg-[#B89369] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B89369]" /> {t.nav.catalogBtn}
              </button>
            ) : (
              <button 
                onClick={() => setCurrentPage('home')}
                className="px-5 py-2.5 rounded-full bg-stone-950 hover:bg-[#B89369] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md"
              >
                {t.nav.backHome}
              </button>
            )}
          </div>

        </div>
      </header>

    </div>
  );
};