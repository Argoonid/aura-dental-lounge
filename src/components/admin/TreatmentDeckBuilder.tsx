import React, { useState } from 'react';
import type { Language } from '../../types/dental';
import { useLanguage } from '../../context/LanguageContext';
import { CustomSelect } from '../ui/CustomSelect';
import { Plus, Trash2, Copy, Check, Send } from 'lucide-react';

interface DeckItem {
  id: string;
  category: 'veneers' | 'ortho' | 'implants' | 'therapy' | 'spa';
  title: string;
  teeth: number[];
  priceEUR: number;
  visits: number;
  recoveryDays: number;
}

const getClinicalProcedures = (lang: Language) => [
  { id: 'v-emax', category: 'veneers', title: lang === 'en' ? 'Ivoclar IPS e.max Press Veneers' : 'Виниры Ivoclar IPS e.max Press (Керамика)', priceEUR: 270, visits: 2, days: 5 },
  { id: 'v-nonprep', category: 'veneers', title: lang === 'en' ? 'Ultra-Thin Non-Prep Lumineers (0.2 mm)' : 'Ультратонкие люминиры Non-Prep (0.2 мм)', priceEUR: 320, visits: 2, days: 4 },
  { id: 'v-zirconia', category: 'veneers', title: lang === 'en' ? 'Prettau Zirconia Full Crowns' : 'Анатомические коронки Prettau Zirconia', priceEUR: 230, visits: 2, days: 4 },
  { id: 'ortho-aligners', category: 'ortho', title: lang === 'en' ? 'Clear Aligners (Full Smile Case)' : 'Прозрачные элайнеры (Кейс Full Smile)', priceEUR: 1650, visits: 2, days: 3 },
  { id: 'ortho-damon', category: 'ortho', title: lang === 'en' ? 'Damon Clear Ceramic Braces' : 'Керамические брекеты Damon Clear', priceEUR: 1200, visits: 2, days: 3 },
  { id: 'imp-straumann', category: 'implants', title: lang === 'en' ? 'Straumann BLX Roxolid Implant + Crown' : 'Имплант Straumann BLX Roxolid + коронка', priceEUR: 620, visits: 3, days: 6 },
  { id: 'imp-allon4', category: 'implants', title: lang === 'en' ? 'All-on-4 Full-Arch Rehabilitation' : 'Тотальная реабилитация All-on-4 (Челюсть под ключ)', priceEUR: 3200, visits: 4, days: 7 },
  { id: 'imp-allon6', category: 'implants', title: lang === 'en' ? 'All-on-6 Full-Arch Rehabilitation' : 'Тотальная реабилитация All-on-6', priceEUR: 4100, visits: 4, days: 7 },
  { id: 'imp-sinus', category: 'implants', title: lang === 'en' ? 'Subantral Bio-Oss Sinus Lift' : 'Субантральный синус-лифтинг Bio-Oss', priceEUR: 450, visits: 2, days: 6 },
  { id: 'endo-zeiss', category: 'therapy', title: lang === 'en' ? 'Zeiss Microscope Root Canal Therapy' : 'Лечение каналов под микроскопом Carl Zeiss', priceEUR: 180, visits: 1, days: 2 },
  { id: 'restoration', category: 'therapy', title: lang === 'en' ? 'Estelite Asteria Aesthetic Restoration' : 'Художественная реставрация зуба Estelite Asteria', priceEUR: 95, visits: 1, days: 1 },
  { id: 'spa-airflow', category: 'spa', title: lang === 'en' ? 'Swiss EMS AirFlow Plus SPA Hygiene' : 'Швейцарская СПА-чистка EMS AirFlow Plus', priceEUR: 80, visits: 1, days: 1 },
  { id: 'spa-zoom4', category: 'spa', title: lang === 'en' ? 'Philips Zoom 4 Laser Whitening' : 'Лазерное холодное отбеливание Philips Zoom 4', priceEUR: 190, visits: 1, days: 1 }
];

export const TreatmentDeckBuilder: React.FC = () => {
  const { t, lang } = useLanguage();
  const clinicalProcedures = getClinicalProcedures(lang);

  const [patientName, setPatientName] = useState('Matteo Moretti');
  const [hotelNights, setHotelNights] = useState(7);
  const [isCopied, setIsCopied] = useState(false);

  const [deckItems, setDeckItems] = useState<DeckItem[]>([
    {
      id: 'item-1',
      category: 'veneers',
      title: clinicalProcedures[0].title,
      teeth: [14, 13, 12, 11, 21, 22, 23, 24],
      priceEUR: 270,
      visits: 2,
      recoveryDays: 5
    },
    {
      id: 'item-2',
      category: 'spa',
      title: clinicalProcedures[11].title,
      teeth: [],
      priceEUR: 80,
      visits: 1,
      recoveryDays: 1
    }
  ]);

  const [selectedProcId, setSelectedProcId] = useState(clinicalProcedures[5].id);
  const [customTeethInput, setCustomTeethInput] = useState('16');

  const procedureOptions = clinicalProcedures.map(p => ({
    value: p.id,
    label: p.title,
    sublabel: `€${p.priceEUR} • ${p.days} ${lang === 'en' ? 'resort days' : 'дн. в Шарме'}`
  }));

  const handleAddProcedure = () => {
    const template = clinicalProcedures.find(p => p.id === selectedProcId);
    if (!template) return;

    const parsedTeeth = customTeethInput
      .split(',')
      .map(s => Number(s.trim()))
      .filter(n => !isNaN(n) && n > 0);

    const newItem: DeckItem = {
      id: `item-${Date.now()}`,
      category: template.category as any,
      title: template.title,
      teeth: parsedTeeth,
      priceEUR: template.priceEUR,
      visits: template.visits,
      recoveryDays: template.days
    };

    setDeckItems(prev => [...prev, newItem]);
    setCustomTeethInput('');
  };

  const handleRemoveItem = (id: string) => {
    setDeckItems(prev => prev.filter(i => i.id !== id));
  };

  const totalPriceEUR = deckItems.reduce((acc, curr) => {
    const qty = curr.teeth.length > 0 ? curr.teeth.length : 1;
    return acc + curr.priceEUR * qty;
  }, 0);

  const maxDaysRequired = Math.max(...deckItems.map(i => i.recoveryDays), 3);
  const totalVisits = Math.max(...deckItems.map(i => i.visits), 2);

  const generatedWhatsAppDeck = lang === 'en'
    ? `Hello ${patientName}!
Here is your finalized clinical treatment plan at AURA Dental Lounge (Sharm El Sheikh):

${deckItems.map((item, idx) => {
  const qty = item.teeth.length > 0 ? `${item.teeth.length} units (FDI:${item.teeth.join(', ')})` : '1 session';
  const sum = item.priceEUR * (item.teeth.length > 0 ? item.teeth.length : 1);
  return `${idx + 1}.${item.title} — ${qty} = €${sum}`;
}).join('\n')}

• Schedule: ${totalVisits} lounge sessions (approx. 4.5 hours in clinical suite).
• Recommended stay: minimum ${maxDaysRequired} resort nights.
• Total investment: €${totalPriceEUR.toLocaleString()} (includes VIP airport & resort transfer, 3Shape scan, and local anesthesia).
• Portal link: aura-sharm.com/plan/${patientName.toLowerCase().replace(/\s+/g, '-')}-771`
    : `Здравствуйте, ${patientName}! 
Ваш план лечения в клинике AURA Dental (Шарм-эль-Шейх):

${deckItems.map((item, idx) => {
  const qty = item.teeth.length > 0 ? `${item.teeth.length} ед. (зубы: ${item.teeth.join(', ')})` : '1 процедура';
  const sum = item.priceEUR * (item.teeth.length > 0 ? item.teeth.length : 1);
  return `${idx + 1}.${item.title} — ${qty} = €${sum}`;
}).join('\n')}

• График визитов: ${totalVisits} посещения лаунджа (всего ~4.5 часа в клинике).
• Рекомендуемый отпуск: от ${maxDaysRequired} ночей.
• Итоговая стоимость: €${totalPriceEUR.toLocaleString()} (включает трансфер из отеля 5★, анестезию и 3D-сканирование 3Shape).
• Персональный план: aura-sharm.com/plan/${patientName.toLowerCase().replace(/\s+/g, '-')}-771`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedWhatsAppDeck);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
      <div className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex justify-between items-center pb-3 border-b border-stone-200">
          <div>
            <h3 className="text-base font-bold text-stone-900">{t.admin.deck.title}</h3>
            <p className="text-xs text-stone-500 font-mono mt-0.5">{t.admin.deck.subtitle}</p>
          </div>
          <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            {t.admin.deck.totalLabel} €{totalPriceEUR.toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div>
            <label className="text-stone-500 block mb-1 uppercase font-medium">{t.admin.deck.patientNameLabel}</label>
            <input
              type="text"
              value={patientName}
              onChange={e => setPatientName(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl p-2.5 text-stone-900 font-sans focus:outline-none focus:border-stone-500"
            />
          </div>

          <div>
            <label className="text-stone-500 block mb-1 uppercase font-medium">{t.admin.deck.hotelNightsLabel}</label>
            <input
              type="number"
              value={hotelNights}
              onChange={e => setHotelNights(Number(e.target.value))}
              className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl p-2.5 text-stone-900 font-sans focus:outline-none focus:border-stone-500"
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-3">
          <span className="text-xs font-mono uppercase text-stone-600 font-bold block">
            {t.admin.deck.addSectionTitle}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            <div className="sm:col-span-8">
              <CustomSelect
                value={selectedProcId}
                options={procedureOptions}
                onChange={setSelectedProcId}
              />
            </div>

            <div className="sm:col-span-4">
              <input
                type="text"
                value={customTeethInput}
                onChange={e => setCustomTeethInput(e.target.value)}
                placeholder={t.admin.deck.teethPlaceholder}
                className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 font-mono focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleAddProcedure}
            className="w-full py-2.5 bg-stone-900 hover:bg-[#B89369] text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> {t.admin.deck.addBtn}
          </button>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-stone-500 font-bold block">
            {t.admin.deck.compositionHeader} ({deckItems.length} {t.admin.deck.itemsCountUnit}):
          </span>

          {deckItems.map(item => {
            const qty = item.teeth.length > 0 ? item.teeth.length : 1;
            const subtotal = item.priceEUR * qty;

            return (
              <div 
                key={item.id} 
                className="p-3.5 bg-white border border-stone-200 rounded-2xl flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-stone-900 font-sans">{item.title}</span>
                    <span className="text-[10px] font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-600 font-semibold">
                      {item.teeth.length > 0 ? `${item.teeth.length} ${t.admin.deck.unitsSuffix}` : t.admin.deck.singleUnit}
                    </span>
                  </div>
                  {item.teeth.length > 0 && (
                    <p className="text-[11px] font-mono text-stone-500">
                      {t.admin.deck.teethLabel} {item.teeth.join(', ')}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-stone-900">
                    €{subtotal.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-5 bg-stone-950 text-white border border-stone-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <span className="text-xs font-mono uppercase text-[#B89369] font-bold">
              {t.admin.deck.previewTitle}
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {t.admin.deck.recommendedStay} {maxDaysRequired} {t.admin.deck.nightsUnit}
            </span>
          </div>

          <pre className="p-4 bg-stone-900/90 border border-stone-800 rounded-2xl text-xs font-mono text-stone-200 whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
            {generatedWhatsAppDeck}
          </pre>
        </div>

        <div className="space-y-2 pt-2 border-t border-stone-800">
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="flex-1 py-3 bg-stone-800 hover:bg-stone-700 text-white text-xs font-mono font-medium rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {isCopied ? t.admin.deck.copiedBtn : t.admin.deck.copyBtn}
            </button>

            <a
              href={`https://wa.me/201000000000?text=${encodeURIComponent(generatedWhatsAppDeck)}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-[#B89369] hover:bg-[#a07c54] text-stone-950 font-bold text-xs font-mono rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> {t.admin.deck.whatsappBtn}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};