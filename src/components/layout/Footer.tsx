import React from 'react';
import type { PageRoute } from '../../types/dental';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Terminal } from 'lucide-react';

interface Props {
  setCurrentPage: (p: PageRoute) => void;
}

export const Footer: React.FC<Props> = ({ setCurrentPage }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#181A19] text-stone-400 font-sans border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* Колонка 1: О клинике */}
        <div className="lg:col-span-4 space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-serif text-white tracking-tight">{t.footer.title}</h3>
            <p className="text-xs font-mono uppercase tracking-widest text-[#B89369]">{t.footer.subtitle}</p>
          </div>
          <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
            {t.footer.desc}
          </p>
          <div className="pt-2 flex items-center space-x-4 text-xs font-mono text-stone-500">
            <span>{t.footer.license}</span>
            <span>•</span>
            <span>ISO 9001:2015</span>
          </div>
        </div>

        {/* Колонка 2: Навигация (Сюда перенесен Терминал OPS: 402) */}
        <div className="lg:col-span-2 space-y-3 text-xs">
          <h4 className="font-mono uppercase text-stone-200 tracking-wider text-[11px]">{t.footer.navTitle}</h4>
          <ul className="space-y-2.5 font-light">
            <li>
              <button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">
                {t.nav.home}
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('catalog')} className="hover:text-white transition-colors text-[#B89369]">
                {t.nav.catalog}
              </button>
            </li>
            <li>
              <a href="#arbitrage" className="hover:text-white transition-colors">
                {t.nav.arbitrage}
              </a>
            </li>
            <li>
              <a href="#calculator" className="hover:text-white transition-colors">
                {t.nav.calculator}
              </a>
            </li>
            <li>
              <a href="#safety" className="hover:text-white transition-colors">
                {t.nav.safety}
              </a>
            </li>

            {/* ПЕРЕНЕСЕННЫЙ ВХОД В АДМИНКУ: не перекрывается виджетом SOS */}
            <li className="pt-3 border-t border-stone-800/80">
              <button
                onClick={() => setCurrentPage('admin')}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700/80 text-stone-300 hover:text-[#B89369] hover:border-[#B89369]/50 transition-all font-mono text-[11px] shadow-xs active:scale-[0.98]"
                title="AURA Operations Hub"
              >
                <Terminal className="w-3.5 h-3.5 text-[#B89369]" />
                <span>Терминал [OPS: 402]</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Колонка 3: Стандарты */}
        <div className="lg:col-span-3 space-y-3 text-xs">
          <h4 className="font-mono uppercase text-stone-200 tracking-wider text-[11px]">{t.footer.standardsTitle}</h4>
          <p className="text-[11px] text-stone-400 font-light leading-relaxed">
            {t.footer.standardsDesc}
          </p>
          <div className="space-y-1.5 font-mono text-[11px] text-stone-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89369]" />
              <span>ADA Dental Claim Form (UK & US)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89369]" />
              <span>BEMA / GOZ Спецификация (DE)</span>
            </div>
          </div>
        </div>

        {/* Колонка 4: Контакты */}
        <div className="lg:col-span-3 space-y-3 text-xs font-mono">
          <h4 className="uppercase text-stone-200 tracking-wider text-[11px]">{t.footer.contactsTitle}</h4>
          <div className="space-y-2 text-stone-400">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#B89369] flex-shrink-0 mt-0.5" />
              <span>{t.footer.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span>{t.footer.hours}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-stone-500" />
              <span>+20 100 000 0000 (VIP)</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-stone-500" />
              <span>concierge@aura-sharm.com</span>
            </p>
          </div>
        </div>

      </div>

      <div className="border-t border-stone-800/80 px-6 py-6 text-xs font-mono text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          
          <div className="flex items-center space-x-6 text-[11px]">
            <span className="hover:text-stone-300 transition-colors">{t.footer.privacy}</span>
            <span className="hover:text-stone-300 transition-colors">{t.footer.warranty}</span>
            <span className="text-stone-600">Sinai Medical Cluster</span>
          </div>
        </div>
      </div>
    </footer>
  );
};