import React, { useState } from 'react';
import { ARBITRAGE_MARKETS } from '../../data/dentalData';
import { useLanguage } from '../../context/LanguageContext';
import { Plane, Hotel, TrendingUp } from 'lucide-react';

export const ArbitrageCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [selectedMarket, setSelectedMarket] = useState(ARBITRAGE_MARKETS[0]);
  const [teethCount, setTeethCount] = useState<number>(8);

  const homeUnitPrice = selectedMarket.avgVeneerCost;
  const homeTotal = homeUnitPrice * teethCount;

  const auraUnitPriceInEUR = 270;
  const auraUnitPrice = Math.round(auraUnitPriceInEUR * (selectedMarket.currency === 'GBP' ? 0.85 : 1));
  const auraTotal = auraUnitPrice * teethCount;

  const netSavings = homeTotal - auraTotal;
  const currencySymbol = selectedMarket.currency === 'GBP' ? '£' : '€';

  return (
    <div className="bg-[#FAF7F2] border border-stone-200 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B89369] font-bold">
            {t.arbitrage.eyebrow}
          </span>
          <h3 className="text-2xl md:text-3xl font-serif text-stone-900 mt-1">
            {t.arbitrage.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {ARBITRAGE_MARKETS.map(market => (
            <button
              key={market.country}
              onClick={() => setSelectedMarket(market)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                selectedMarket.country === market.country
                  ? 'bg-stone-900 border-stone-900 text-white shadow-sm font-semibold'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
              }`}
            >
              <span className="mr-1.5">{market.flag}</span>
              {market.city}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-stone-500 uppercase">{t.arbitrage.volumeLabel}</span>
              <span className="text-stone-900 font-bold text-sm">{teethCount} {t.arbitrage.units}</span>
            </div>
            <input 
              type="range" 
              min="4" 
              max="20" 
              value={teethCount}
              onChange={e => setTeethCount(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-stone-400 mt-1">
              <span>{t.arbitrage.preset4}</span>
              <span>{t.arbitrage.preset10}</span>
              <span>{t.arbitrage.preset20}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white rounded-2xl border border-stone-200">
              <span className="text-[11px] font-mono text-stone-400 block">{selectedMarket.city}:</span>
              <span className="text-xl font-serif text-stone-500 line-through">
                {homeTotal.toLocaleString()} {currencySymbol}
              </span>
              <span className="text-[10px] text-stone-400 block mt-1">{t.arbitrage.homeDesc}</span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#B89369]/40 bg-gradient-to-br from-white to-[#B89369]/5">
              <span className="text-[11px] font-mono text-[#B89369] font-bold block">AURA Lounge:</span>
              <span className="text-xl font-serif text-stone-900 font-medium">
                {auraTotal.toLocaleString()} {currencySymbol}
              </span>
              <span className="text-[10px] text-emerald-600 block mt-1">{t.arbitrage.auraDesc}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-stone-900 text-white rounded-3xl p-6 md:p-8 space-y-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#B89369] flex items-center gap-1.5 font-bold">
              <TrendingUp className="w-4 h-4" /> {t.arbitrage.savingsLabel}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
              -{(100 - (auraTotal / homeTotal) * 100).toFixed(0)}%
            </span>
          </div>

          <div>
            <div className="text-4xl md:text-5xl font-serif text-white font-normal">
              +{netSavings.toLocaleString()} {currencySymbol}
            </div>
            <p className="text-xs text-stone-400 font-light mt-1">
              {t.arbitrage.savingsNote}
            </p>
          </div>

          <div className="border-t border-stone-800 pt-4 space-y-2.5 text-xs text-stone-300 font-light">
            <div className="flex items-center gap-2.5">
              <Hotel className="w-4 h-4 text-[#B89369] flex-shrink-0" />
              <span>{t.arbitrage.benefitHotel}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Plane className="w-4 h-4 text-[#B89369] flex-shrink-0" />
              <span>{t.arbitrage.benefitFlights}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};