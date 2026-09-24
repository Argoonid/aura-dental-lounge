import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '../types/dental';
import { TRANSLATIONS } from '../data/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: typeof TRANSLATIONS.ru;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('aura_lang');
    return (saved === 'en' || saved === 'ru') ? saved : 'ru';
  });

  useEffect(() => {
    localStorage.setItem('aura_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: TRANSLATIONS[lang]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};