import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface Option {
  value: string;
  label: string;
  sublabel?: string;
}

interface Props {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const CustomSelect: React.FC<Props> = ({
  value,
  options,
  onChange,
  placeholder = 'Выберите...',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative font-sans text-xs ${className}`}>
      {/* Кнопка поля */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 flex items-center justify-between text-left hover:border-stone-400 focus:outline-none transition-colors shadow-xs"
      >
        <span className="truncate pr-2 font-medium">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-stone-900' : ''}`} />
      </button>

      {/* Выпадающее меню с тонким скроллом */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white border border-stone-200 rounded-2xl shadow-xl max-h-56 overflow-y-auto p-1.5 space-y-0.5 animate-in fade-in-50 zoom-in-95 duration-150">
          {options.map(opt => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950'
                }`}
              >
                <div className="truncate pr-2">
                  <p className="truncate text-xs">{opt.label}</p>
                  {opt.sublabel && (
                    <p className={`text-[10px] font-mono ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                      {opt.sublabel}
                    </p>
                  )}
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#B89369] flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};