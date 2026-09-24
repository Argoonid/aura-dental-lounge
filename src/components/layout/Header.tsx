import React from 'react';
import type { Currency, Language, PageRoute } from '../../types/dental';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, ArrowLeft, MessageSquare } from 'lucide-react';

interface Props {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  lang: Language;
  setLang: (l: Language) => void;
  currentPage: PageRoute;
  setCurrentPage: (p: PageRoute) => void;
}

const CURRENCIES: Currency[] = ['EUR', 'USD', 'GBP', 'EGP'];

export const Header: React.FC<Props> = ({
  currency,
  setCurrency,
  lang,
  setLang,
  currentPage,
  setCurrentPage,
}) => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/90 font-sans select-none">
      
      {/* 1. ВЕРХНИЙ ИНФОРМАЦИОННЫЙ БАР (Очищен от переполнения на мобилках) */}
      <div className="bg-[#181A19] text-stone-300 text-[11px] font-mono border-b border-stone-800 px-3 sm:px-6 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Статус моря / трансфера */}
          <div className="flex items-center space-x-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-emerald-400 font-semibold truncate hidden xs:inline">
              {t.topBar.seaTemp}
            </span>
            <span className="text-emerald-400 font-semibold truncate xs:hidden">
              +28°C Red Sea
            </span>
          </div>

          {/* Контролы: Языки + Валюты + Быстрый SOS */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            
            {/* Переключатель языка RU / EN */}
            <div className="flex items-center bg-stone-900 rounded-lg p-0.5 border border-stone-800 text-[10px]">
              <button
                onClick={() => setLang('ru')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  lang === 'ru' ? 'bg-[#B89369] text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  lang === 'en' ? 'bg-[#B89369] text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Селектор валют */}
            <div className="flex items-center bg-stone-900 rounded-lg p-0.5 border border-stone-800 text-[10px]">
              {CURRENCIES.map(curr => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    currency === curr ? 'bg-stone-800 text-[#B89369] font-bold' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* Быстрый линк WhatsApp SOS */}
            <a
              href="https://wa.me/201000000000?text=SOS"
              target="_blank"
              rel="noreferrer"
              className="text-[#B89369] hover:text-amber-300 transition-colors hidden sm:flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
            >
              <MessageSquare className="w-3 h-3" />
              <span>{t.topBar.whatsappSos}</span>
            </a>

          </div>
        </div>
      </div>

      {/* 2. ОСНОВНАЯ НАВИГАЦИОННАЯ ПАНЕЛЬ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-3">
        
        {/* Логотип AURA */}
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center space-x-2.5 text-left focus:outline-none flex-shrink-0 group"
        >
          <div className="flex flex-col">
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-[0.2em] text-stone-950 leading-none group-hover:text-[#B89369] transition-colors">
              AURA
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.3em] uppercase text-[#B89369] font-bold mt-1">
              Dental Lounge • Sharm
            </span>
          </div>
        </button>

        {/* Навигационные ссылки (только десктоп) */}
        {currentPage === 'home' && (
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-mono uppercase tracking-wider text-stone-600">
            <a href="#arbitrage" className="hover:text-stone-950 transition-colors">
              {t.nav.arbitrage}
            </a>
            <a href="#calculator" className="hover:text-stone-950 transition-colors">
              {t.nav.calculator}
            </a>
            <a href="#timeline" className="hover:text-stone-950 transition-colors">
              {t.nav.timeline}
            </a>
            <a href="#safety" className="hover:text-stone-950 transition-colors">
              {t.nav.safety}
            </a>
          </nav>
        )}

        {/* ПРАВАЯ КНОПКА: Безупречно адаптирована под экраны телефонов */}
        <div className="flex items-center flex-shrink-0">
          {currentPage === 'catalog' ? (
            <button
              onClick={() => setCurrentPage('home')}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-stone-900 hover:bg-[#B89369] text-white text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-sm flex items-center gap-1.5 active:scale-[0.98]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#B89369]" />
              <span>{t.nav.backHome}</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentPage('catalog')}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-stone-950 hover:bg-[#B89369] text-white text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-stone-950/15 flex items-center gap-1.5 active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B89369] flex-shrink-0" />
              <span>
                {lang === 'en' ? 'Catalog' : 'Каталог'}
                <span className="hidden sm:inline">
                  {lang === 'en' ? ' & Fees' : ' и цены'}
                </span>
              </span>
            </button>
          )}
        </div>

      </div>

    </header>
  );
};