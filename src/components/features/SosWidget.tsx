import React, { useState } from 'react';
import { RESORT_HOTELS } from '../../data/dentalData';
import { useLanguage } from '../../context/LanguageContext';
import { 
  X, Send, Car, PhoneCall, Zap, ShieldAlert, Check
} from 'lucide-react';

export const SosWidget: React.FC = () => {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState(t.sos.symptoms[0].label);
  const [selectedHotel, setSelectedHotel] = useState(RESORT_HOTELS[0]);
  const [roomNumber, setRoomNumber] = useState('');
  const [painLevel, setPainLevel] = useState<'moderate' | 'acute' | 'unbearable'>('acute');

  const handleSendSos = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `🚨 [EMERGENCY SOS SIGNAL - AURA DENTAL]
• Clinical Issue: ${selectedSymptom}
• Severity: ${painLevel.toUpperCase()}
• Resort: ${selectedHotel.name} (${selectedHotel.district})
• Room / Suite: ${roomNumber || 'At security gate'}
• Chauffeur ETA: ≈ ${selectedHotel.eta}

Language: ${lang.toUpperCase()}`;

    window.open(`https://wa.me/201000000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3.5 rounded-full bg-stone-950 text-white border border-stone-800 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.5)] hover:border-[#B89369] hover:bg-stone-900 transition-all duration-300"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600" />
          </span>

          <div className="flex flex-col text-left leading-none">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#B89369] font-bold">
              {t.sos.badge}
            </span>
            <span className="text-xs font-serif text-stone-200 mt-0.5">
              {t.sos.triggerTitle}
            </span>
          </div>

          <div className="p-1.5 rounded-full bg-stone-800 text-[#B89369] group-hover:bg-[#B89369] group-hover:text-stone-950 transition-colors">
            <Zap className="w-3.5 h-3.5" />
          </div>
        </button>
      )}

      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-[420px] max-h-[85vh] overflow-y-auto bg-[#FAF7F2] border border-stone-300 rounded-3xl shadow-2xl p-6 text-stone-900">
          <div className="flex items-start justify-between pb-4 border-b border-stone-200">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-600 text-white">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-950 leading-tight">
                  {t.sos.modalTitle}
                </h3>
                <p className="text-[11px] font-mono text-stone-500 mt-0.5">
                  {t.sos.modalSubtitle}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-950 hover:bg-stone-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSendSos} className="mt-4 space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold block mb-2">
                {t.sos.step1}
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {t.sos.symptoms.map(s => {
                  const isSelected = selectedSymptom === s.label;
                  return (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setSelectedSymptom(s.label)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-start justify-between ${
                        isSelected 
                          ? 'bg-white border-[#B89369] shadow-sm ring-1 ring-[#B89369]' 
                          : 'bg-white/60 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-semibold text-stone-900 leading-snug">{s.label}</p>
                        <p className="text-[10px] text-stone-500 mt-0.5">{s.desc}</p>
                      </div>
                      {isSelected && (
                        <span className="p-0.5 rounded-full bg-[#B89369] text-white mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold block mb-2">
                {t.sos.step2}
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                {[
                  { id: 'moderate', label: t.sos.painBearable },
                  { id: 'acute', label: t.sos.painAcute },
                  { id: 'unbearable', label: t.sos.painUnbearable }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPainLevel(item.id as typeof painLevel)}
                    className={`py-2 px-1 rounded-xl border text-center transition-all text-[11px] font-semibold ${
                      painLevel === item.id
                        ? item.id === 'unbearable'
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                          : 'bg-stone-950 text-white border-stone-950 shadow-sm'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold block">
                {t.sos.step3}
              </label>
              <select
                value={selectedHotel.name}
                onChange={e => {
                  const h = RESORT_HOTELS.find(item => item.name === e.target.value);
                  if (h) setSelectedHotel(h);
                }}
                className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:outline-none"
              >
                {RESORT_HOTELS.map(hotel => (
                  <option key={hotel.name} value={hotel.name}>
                    {hotel.name} ({hotel.district})
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={roomNumber}
                onChange={e => setRoomNumber(e.target.value)}
                placeholder={t.sos.roomPlaceholder}
                className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-stone-100/80 border border-stone-200 flex items-center justify-between text-[11px] font-mono">
              <span className="text-stone-500 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-[#B89369]" /> {t.sos.etaLabel}
              </span>
              <span className="text-stone-950 font-bold">≈ {selectedHotel.eta}</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-600/20"
            >
              <Send className="w-4 h-4" /> {t.sos.sendBtn}
            </button>

            <div className="text-center pt-1 border-t border-stone-200">
              <a
                href="tel:+201000000000"
                className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-950 text-xs font-mono font-medium transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-rose-600" /> {t.sos.callDirect}
              </a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};