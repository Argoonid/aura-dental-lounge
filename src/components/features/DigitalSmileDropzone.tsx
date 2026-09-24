import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Camera, FileUp, Send, CheckCircle2, 
  Clock, ShieldCheck, ArrowRight, Lock 
} from 'lucide-react';

export const DigitalSmileDropzone: React.FC = () => {
  const { t, lang } = useLanguage();
  const [tab, setTab] = useState<'photo' | 'xray'>('photo');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-stone-200 rounded-3xl p-6 md:p-10 shadow-sm space-y-8 font-sans">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#B89369] font-bold">
          {t.dropzone.eyebrow}
        </span>
        <h3 className="text-2xl md:text-3xl font-serif text-stone-950">
          {t.dropzone.title}
        </h3>
        <p className="text-stone-600 text-sm font-normal leading-relaxed">
          {t.dropzone.desc}
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Табы выбора источника */}
          <div className="flex justify-center">
            <div className="flex bg-[#FAF7F2] p-1 rounded-2xl border border-stone-200 text-xs font-mono">
              <button
                type="button"
                onClick={() => setTab('photo')}
                className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  tab === 'photo' 
                    ? 'bg-stone-900 text-white font-bold shadow-sm' 
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{t.dropzone.tabPhoto}</span>
              </button>

              <button
                type="button"
                onClick={() => setTab('xray')}
                className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  tab === 'xray' 
                    ? 'bg-stone-900 text-white font-bold shadow-sm' 
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                <FileUp className="w-3.5 h-3.5" />
                <span>{t.dropzone.tabXray}</span>
              </button>
            </div>
          </div>

          {/* Область дропзоны */}
          <label className="relative border-2 border-dashed border-stone-300 hover:border-[#B89369] bg-[#FAF7F2] rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
            <input 
              type="file" 
              accept={tab === 'photo' ? 'image/*' : '.jpg,.png,.dcm,.pdf'} 
              onChange={handleFileChange}
              className="hidden" 
            />
            
            <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 text-[#B89369] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-xs">
              {tab === 'photo' ? <Camera className="w-6 h-6" /> : <FileUp className="w-6 h-6" />}
            </div>

            <p className="text-xs font-semibold text-stone-900 font-sans">
              {fileName || (tab === 'photo' ? t.dropzone.uploadPromptPhoto : t.dropzone.uploadPromptXray)}
            </p>
            <p className="text-[11px] text-stone-500 font-mono mt-1">
              JPG, PNG, DICOM, PDF (до 25 MB)
            </p>
          </label>

          {/* Поле телефона и кнопка */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder={t.dropzone.inputPlaceholder}
              required
              className="flex-1 bg-[#FAF7F2] border border-stone-300 rounded-2xl px-4 py-3.5 text-xs text-stone-900 placeholder-stone-400 font-mono focus:outline-none focus:border-stone-500"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-stone-950 hover:bg-[#B89369] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>{t.dropzone.submitBtn}</span>
              <ArrowRight className="w-4 h-4 text-[#B89369]" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-stone-500 pt-2 border-t border-stone-100">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-stone-400" /> {t.dropzone.gdpr}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <Clock className="w-3 h-3" /> {t.dropzone.badgeTime}
            </span>
          </div>

        </form>
      ) : (
        <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-emerald-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-serif text-lg font-bold text-stone-950">
            {t.dropzone.successTitle}
          </h4>
          <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
            {t.dropzone.successDesc}
          </p>
          <p className="text-xs font-mono font-bold text-stone-900 pt-2">
            WhatsApp: {phone}
          </p>
        </div>
      )}

    </div>
  );
};