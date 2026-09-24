import React from 'react';
import type { ToothDef, JawType } from '../../types/dental';
import { useLanguage } from '../../context/LanguageContext';
import { RotateCcw, Sparkles } from 'lucide-react';

interface Props {
  teeth: ToothDef[];
  activeJaw: JawType;
  setActiveJaw: (j: JawType) => void;
  selectedTeeth: number[];
  onToggleTooth: (fdi: number) => void;
  onSelectPreset: (type: 'smile' | 'upper' | 'all' | 'clear') => void;
}

// Миниатюрные векторные контуры анатомических коронок
const ToothShape: React.FC<{ type: ToothDef['type']; isSelected: boolean }> = ({ type, isSelected }) => {
  const strokeColor = isSelected ? '#B89369' : '#A8A29E';
  const fillColor = isSelected ? 'rgba(184, 147, 105, 0.25)' : 'rgba(245, 245, 244, 0.6)';

  switch (type) {
    case 'molar':
      // Широкая четырехбугорковая жевательная поверхность
      return (
        <svg viewBox="0 0 24 28" className="w-4 h-5 transition-transform group-hover:scale-110">
          <path
            d="M 4 8 C 4 3, 20 3, 20 8 C 21 15, 19 25, 12 26 C 5 25, 3 15, 4 8 Z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <line x1="8" y1="8" x2="16" y2="8" stroke={strokeColor} strokeWidth="1" strokeDasharray="1 1" />
        </svg>
      );
    case 'premolar':
      // Округлая двухбугорковая коронка
      return (
        <svg viewBox="0 0 20 28" className="w-3.5 h-5 transition-transform group-hover:scale-110">
          <path
            d="M 3 9 C 3 4, 17 4, 17 9 C 18 16, 16 25, 10 26 C 4 25, 2 16, 3 9 Z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
        </svg>
      );
    case 'canine':
      // Заостренная клиновидная форма клыка
      return (
        <svg viewBox="0 0 18 30" className="w-3.5 h-5 transition-transform group-hover:scale-110">
          <path
            d="M 2 10 C 4 4, 9 2, 9 2 C 9 2, 14 4, 16 10 C 17 17, 15 27, 9 28 C 3 27, 1 17, 2 10 Z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
        </svg>
      );
    case 'central':
    case 'lateral':
    default:
      // Плоский режущий край резцов
      return (
        <svg viewBox="0 0 18 30" className="w-3.5 h-5 transition-transform group-hover:scale-110">
          <path
            d="M 2 8 C 2 5, 16 5, 16 8 C 17 16, 15 27, 9 28 C 3 27, 1 16, 2 8 Z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
          <line x1="4" y1="7" x2="14" y2="7" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );
  }
};

export const Odontogram: React.FC<Props> = ({
  teeth,
  activeJaw,
  setActiveJaw,
  selectedTeeth,
  onToggleTooth,
  onSelectPreset
}) => {
  const { t } = useLanguage();
  const currentJawTeeth = teeth.filter(t => t.jaw === activeJaw);

  // Разделение на правый и левый квадранты для идеальной симметрии
  const rightQuadrant = currentJawTeeth.filter(t => t.fdi.toString().startsWith('1') || t.fdi.toString().startsWith('4'));
  const leftQuadrant = currentJawTeeth.filter(t => t.fdi.toString().startsWith('2') || t.fdi.toString().startsWith('3'));

  return (
    <div className="space-y-6 select-none font-sans max-w-4xl mx-auto">
      
      {/* 1. Верхняя панель: Переключение челюсти и пресеты */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-stone-200">
        
        {/* Выбор челюсти */}
        <div className="flex items-center bg-[#F3EFEA] p-1 rounded-2xl text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveJaw('upper')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeJaw === 'upper'
                ? 'bg-stone-950 text-white font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            {t.odontogram.upperJaw}
          </button>
          <button
            type="button"
            onClick={() => setActiveJaw('lower')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeJaw === 'lower'
                ? 'bg-stone-950 text-white font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            {t.odontogram.lowerJaw}
          </button>
        </div>

        {/* Быстрые пресеты */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="text-stone-400 mr-1 hidden md:inline text-[11px]">{t.odontogram.presetsLabel}</span>
          <button
            type="button"
            onClick={() => onSelectPreset('smile')}
            className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:border-[#B89369] transition-colors shadow-2xs font-medium text-[11px]"
          >
            {t.odontogram.presetSmile}
          </button>
          <button
            type="button"
            onClick={() => onSelectPreset('upper')}
            className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:border-stone-400 transition-colors shadow-2xs font-medium text-[11px]"
          >
            {t.odontogram.presetFull}
          </button>
          <button
            type="button"
            onClick={() => onSelectPreset('clear')}
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-400 hover:text-rose-600 transition-colors shadow-2xs"
            title={t.odontogram.presetReset}
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* 2. Компактная архитектурная формула (без гигантских черных плит) */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-7 shadow-xs">
        
        {/* Индикатор ориентации */}
        <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 uppercase tracking-widest pb-4 border-b border-stone-100">
          <span>{t.odontogram.sideRight}</span>
          <span className="text-[#B89369] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89369]" />
            {t.odontogram.center}
          </span>
          <span>{t.odontogram.sideLeft}</span>
        </div>

        {/* Горизонтальный скролл-контейнер для мобильных с фиксацией на десктопе */}
        <div className="overflow-x-auto pt-5 pb-2 -mx-2 px-2 scrollbar-none">
          <div className="min-w-[620px] flex items-center justify-between gap-1 sm:gap-2">
            
            {/* Правый квадрант (18 -> 11) */}
            <div className="flex items-center gap-1 sm:gap-1.5 flex-1 justify-end">
              {rightQuadrant.map(tooth => {
                const isSelected = selectedTeeth.includes(tooth.fdi);
                return (
                  <button
                    key={tooth.fdi}
                    type="button"
                    onClick={() => onToggleTooth(tooth.fdi)}
                    className={`group relative flex flex-col items-center justify-between py-2 px-1 rounded-2xl border transition-all duration-200 w-10 sm:w-11 h-20 sm:h-22 ${
                      isSelected
                        ? 'bg-[#181A19] border-[#181A19] text-white shadow-md -translate-y-1 ring-1 ring-[#B89369]/40'
                        : 'bg-[#FAF7F2] border-stone-200/90 text-stone-700 hover:border-[#B89369] hover:bg-white'
                    }`}
                  >
                    {/* Номер FDI */}
                    <span className={`text-[10px] font-mono font-bold ${
                      isSelected ? 'text-[#B89369]' : 'text-stone-400 group-hover:text-stone-800'
                    }`}>
                      {tooth.fdi}
                    </span>

                    {/* Анатомическая пиктограмма */}
                    <ToothShape type={tooth.type} isSelected={isSelected} />

                    {/* Индикатор зоны улыбки / выборки */}
                    <span className={`w-1 h-1 rounded-full ${
                      isSelected 
                        ? 'bg-[#B89369]' 
                        : tooth.isSmileZone 
                        ? 'bg-amber-300' 
                        : 'bg-transparent'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Центральная косметическая линия разделения (Midline) */}
            <div className="h-16 w-px bg-stone-200 mx-1 flex flex-col justify-between items-center py-1">
              <span className="w-1 h-1 rounded-full bg-stone-300" />
              <span className="w-1 h-1 rounded-full bg-[#B89369]" />
              <span className="w-1 h-1 rounded-full bg-stone-300" />
            </div>

            {/* Левый квадрант (21 -> 28) */}
            <div className="flex items-center gap-1 sm:gap-1.5 flex-1 justify-start">
              {leftQuadrant.map(tooth => {
                const isSelected = selectedTeeth.includes(tooth.fdi);
                return (
                  <button
                    key={tooth.fdi}
                    type="button"
                    onClick={() => onToggleTooth(tooth.fdi)}
                    className={`group relative flex flex-col items-center justify-between py-2 px-1 rounded-2xl border transition-all duration-200 w-10 sm:w-11 h-20 sm:h-22 ${
                      isSelected
                        ? 'bg-[#181A19] border-[#181A19] text-white shadow-md -translate-y-1 ring-1 ring-[#B89369]/40'
                        : 'bg-[#FAF7F2] border-stone-200/90 text-stone-700 hover:border-[#B89369] hover:bg-white'
                    }`}
                  >
                    <span className={`text-[10px] font-mono font-bold ${
                      isSelected ? 'text-[#B89369]' : 'text-stone-400 group-hover:text-stone-800'
                    }`}>
                      {tooth.fdi}
                    </span>

                    <ToothShape type={tooth.type} isSelected={isSelected} />

                    <span className={`w-1 h-1 rounded-full ${
                      isSelected 
                        ? 'bg-[#B89369]' 
                        : tooth.isSmileZone 
                        ? 'bg-amber-300' 
                        : 'bg-transparent'
                    }`} />
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Подсказка видимости фронтальной зоны */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
            <span>Фронтальная зона улыбки (14 — 24)</span>
          </div>
          <span className="font-bold text-stone-800">
            Выбрано: {selectedTeeth.length} ед.
          </span>
        </div>

      </div>

    </div>
  );
};