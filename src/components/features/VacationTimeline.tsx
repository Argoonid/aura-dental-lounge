import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sun, Stethoscope, Utensils } from 'lucide-react';

export const VacationTimeline: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#FAF7F2] border border-stone-200 rounded-3xl p-6 md:p-10 shadow-sm space-y-8 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-2 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B89369] font-bold">
            {t.timeline.eyebrow}
          </span>
          <h3 className="text-2xl md:text-3xl font-serif text-stone-900 mt-1">
            {t.timeline.title}
          </h3>
        </div>
        <span className="text-xs font-mono text-stone-500">{t.timeline.standardProtocol}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {t.timeline.schedule.map((item, idx) => {
          const isClinical = idx === 1 || idx === 4;
          const isLab = idx === 3;

          return (
            <div 
              key={idx}
              className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                isClinical 
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md -translate-y-1' 
                  : isLab
                  ? 'bg-[#B89369]/10 border-[#B89369]/30 text-stone-800'
                  : 'bg-white border-stone-200 text-stone-800'
              }`}
            >
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                  <span className={isClinical ? 'text-[#B89369] font-bold' : 'text-stone-400'}>
                    {item.day}
                  </span>
                  {isClinical ? (
                    <Stethoscope className="w-3.5 h-3.5 text-[#B89369]" />
                  ) : isLab ? (
                    <Utensils className="w-3.5 h-3.5 text-[#B89369]" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                  )}
                </div>
                <p className={`text-xs font-serif font-medium ${isClinical ? 'text-white' : 'text-stone-900'}`}>
                  {item.title}
                </p>
                <p className={`text-[11px] mt-1 font-light leading-relaxed ${isClinical ? 'text-stone-400' : 'text-stone-500'}`}>
                  {item.desc}
                </p>
              </div>
              <div className={`mt-4 pt-2 border-t text-[10px] font-mono ${
                isClinical ? 'border-stone-800 text-emerald-400' : 'border-stone-100 text-stone-400'
              }`}>
                {item.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};