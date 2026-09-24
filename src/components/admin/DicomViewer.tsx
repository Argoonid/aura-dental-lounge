import React, { useState, useRef } from 'react';
import type { Language } from '../../types/dental';
import { useLanguage } from '../../context/LanguageContext';
import { RotateCcw, Upload } from 'lucide-react';

interface PatientScan {
  id: string;
  patientName: string;
  country: string;
  flag: string;
  scanDate: string;
  scanType: string;
  machine: string;
  diagnosis: string;
  suggestedAction: string;
  defaultPoints: [{ x: number; y: number }, { x: number; y: number }];
  imageSrc: string;
}

const EXTENSIONS_TO_TRY = ['.jpg', '.png', '.jpeg', '.webp', ''];

const getPatientScans = (lang: Language): PatientScan[] => [
  {
    id: 'AUR-9014',
    patientName: 'Matteo Moretti',
    country: lang === 'en' ? 'Italy' : 'Италия',
    flag: '🇮🇹',
    scanDate: '24.09.2026',
    scanType: lang === 'en' ? 'CBCT Maxilla (3D Slice)' : 'КЛКТ челюсти (3D срез)',
    machine: 'KaVo OP 3D Pro • Sinai Lab',
    diagnosis: lang === 'en'
      ? 'Zone 16: Periapical radiolucency at distal root apex, reactive sinus mucosa thickening.'
      : 'Зона 16: периапикальное разрежение костной ткани у дистального корня, отек слизистой гайморовой пазухи.',
    suggestedAction: lang === 'en'
      ? 'Emergency endodontic access, root canal disinfection prior to departure flight.'
      : 'Купирование острого пульпита, дезинфекция корневых каналов перед обратным авиаперелетом.',
    defaultPoints: [{ x: 310, y: 155 }, { x: 310, y: 245 }],
    imageSrc: '/kt1.jpg'
  },
  {
    id: 'AUR-8842',
    patientName: 'Alexander Bauer',
    country: lang === 'en' ? 'Germany' : 'Германия',
    flag: '🇩🇪',
    scanDate: '23.09.2026',
    scanType: lang === 'en' ? 'Panoramic Radiograph (OPG)' : 'Панорамная томограмма',
    machine: 'Planmeca ProMax 3D',
    diagnosis: lang === 'en'
      ? 'Zone 26 alveolar ridge: vertical bone height 11.2 mm. Misch D2 bone density.'
      : 'Альвеолярный гребень в зоне 26: высота костного массива 11.2 мм. Плотность кости D2 по Мишу.',
    suggestedAction: lang === 'en'
      ? 'Direct Straumann BLX 10 mm fixture placement approved without open sinus lift.'
      : 'Разрешена прямая установка имплантата Straumann BLX 10 мм без открытого синус-лифтинга.',
    defaultPoints: [{ x: 420, y: 160 }, { x: 420, y: 270 }],
    imageSrc: '/kt1.jpg'
  },
  {
    id: 'AUR-7930',
    patientName: 'Charlotte Davies',
    country: lang === 'en' ? 'United Kingdom' : 'Великобритания',
    flag: '🇬🇧',
    scanDate: '22.09.2026',
    scanType: lang === 'en' ? 'Anterior Segment CBCT' : 'КЛКТ фронтального отдела',
    machine: 'Dentsply Sirona Orthophos',
    diagnosis: lang === 'en'
      ? 'Anterior sextant 14–24: labial enamel layer 0.8 mm, zero vertical bone loss.'
      : 'Фронтальная группа 14–24: толщина вестибулярной эмали 0.8 мм, костная опора без атрофии.',
    suggestedAction: lang === 'en'
      ? 'Micro-invasive veneer prep for ultra-thin Ivoclar E-Max ceramics (0.3 mm).'
      : 'Микро-инвазивное препарирование под ультратонкие керамические виниры Ivoclar E-Max (0.3 мм).',
    defaultPoints: [{ x: 500, y: 170 }, { x: 500, y: 260 }],
    imageSrc: '/kt1.jpg'
  }
];

export const DicomViewer: React.FC = () => {
  const { t, lang } = useLanguage();
  const patientScans = getPatientScans(lang);

  const [selectedScanIndex, setSelectedScanIndex] = useState(0);
  const selectedScan = patientScans[selectedScanIndex] || patientScans[0];

  const [currentImageSrc, setCurrentImageSrc] = useState<string>('/kt1.jpg');
  const [extIndex, setExtIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Фильтры изображения
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(120);
  const [invert, setInvert] = useState(false);

  // Измерительные точки линейки
  const [points, setPoints] = useState<{ x: number; y: number }[]>(selectedScan.defaultPoints);

  const mmPerPixel = 0.105;
  const currentDistancePx = points.length === 2 
    ? Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y)
    : 0;
  const currentDistanceMm = (currentDistancePx * mmPerPixel).toFixed(1);

  const handleImageError = () => {
    if (extIndex < EXTENSIONS_TO_TRY.length - 1) {
      const nextIndex = extIndex + 1;
      setExtIndex(nextIndex);
      setCurrentImageSrc(`/kt1${EXTENSIONS_TO_TRY[nextIndex]}`);
    }
  };

  const handleSelectPatient = (index: number) => {
    setSelectedScanIndex(index);
    setPoints(patientScans[index].defaultPoints);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCurrentImageSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 900);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 450);

    if (points.length >= 2) {
      setPoints([{ x, y }]);
    } else {
      setPoints(prev => [...prev, { x, y }]);
    }
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(120);
    setInvert(false);
    setPoints(selectedScan.defaultPoints);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
      
      {/* 1. Левая колонка: База снимков */}
      <div className="lg:col-span-4 bg-white border border-stone-200 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <h3 className="text-sm font-bold text-stone-900">{t.admin.dicom.title}</h3>
            <p className="text-[11px] text-stone-500 font-mono">{t.admin.dicom.hubSubtitle}</p>
          </div>
          
          <label className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer transition-colors" title={t.admin.dicom.uploadTitle}>
            <Upload className="w-3.5 h-3.5" />
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
          {patientScans.map((scan, idx) => {
            const isSelected = selectedScanIndex === idx;
            return (
              <div
                key={scan.id}
                onClick={() => handleSelectPatient(idx)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-stone-950 text-white border-stone-950 shadow-md'
                    : 'bg-[#FAF7F2] border-stone-200 hover:border-stone-400 text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{scan.flag}</span>
                    <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                      {scan.patientName}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-[#B89369]' : 'text-stone-400'}`}>
                    {scan.id}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono opacity-80">
                  <span>{scan.scanType}</span>
                  <span>{scan.scanDate}</span>
                </div>

                <p className={`text-[11px] mt-2 line-clamp-2 leading-relaxed ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                  {scan.diagnosis}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Правая колонка: Просмотрщик КТ */}
      <div className="lg:col-span-8 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-4">
        
        {/* Панель регулировок */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200 text-xs font-mono">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 font-sans text-sm">{selectedScan.patientName}</span>
              <span className="text-stone-400 font-mono text-xs">• {selectedScan.id}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {selectedScan.scanType}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-sans mt-0.5">{selectedScan.machine}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Яркость */}
            <div className="flex items-center gap-2 bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-stone-200">
              <span className="text-stone-500 text-[11px]">{t.admin.dicom.brightness}</span>
              <input 
                type="range" 
                min="50" 
                max="200" 
                value={brightness} 
                onChange={e => setBrightness(Number(e.target.value))}
                className="w-20 cursor-pointer" 
              />
              <span className="text-stone-900 font-bold text-[11px] w-8 text-right">{brightness}%</span>
            </div>

            {/* Контраст */}
            <div className="flex items-center gap-2 bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-stone-200">
              <span className="text-stone-500 text-[11px]">{t.admin.dicom.contrast}</span>
              <input 
                type="range" 
                min="50" 
                max="250" 
                value={contrast} 
                onChange={e => setContrast(Number(e.target.value))}
                className="w-20 cursor-pointer" 
              />
              <span className="text-stone-900 font-bold text-[11px] w-8 text-right">{contrast}%</span>
            </div>

            {/* Инверсия */}
            <button
              onClick={() => setInvert(!invert)}
              className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono font-bold transition-all ${
                invert 
                  ? 'bg-stone-950 text-white border-stone-950 shadow-xs' 
                  : 'bg-[#FAF7F2] text-stone-700 border-stone-300 hover:bg-stone-100'
              }`}
            >
              {t.admin.dicom.invert}
            </button>

            {/* Сброс */}
            <button
              onClick={resetFilters}
              className="p-2 rounded-xl bg-[#FAF7F2] border border-stone-300 text-stone-600 hover:text-stone-950 transition-colors"
              title={t.admin.dicom.reset}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Область реального КТ-снимка челюсти */}
        <div 
          ref={containerRef}
          onClick={handleContainerClick}
          className="relative rounded-2xl overflow-hidden bg-black border border-stone-900 aspect-[2/1] cursor-crosshair select-none flex items-center justify-center"
        >
          <img
            src={currentImageSrc}
            alt="Dental CT Scan"
            onError={handleImageError}
            style={{
              filter: `brightness(${brightness}%) contrast(${contrast}%)${invert ? ' invert(1)' : ''}`,
              transition: 'none'
            }}
            className="w-full h-full object-contain pointer-events-none select-none"
          />

          {/* Измерительный векторный оверлей */}
          <svg 
            viewBox="0 0 900 450" 
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {points.length === 2 && (
              <g>
                <line
                  x1={points[0].x}
                  y1={points[0].y}
                  x2={points[1].x}
                  y2={points[1].y}
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                />

                <circle cx={points[0].x} cy={points[0].y} r="5" fill="#F59E0B" stroke="#000000" strokeWidth="1.5" />
                <circle cx={points[1].x} cy={points[1].y} r="5" fill="#F59E0B" stroke="#000000" strokeWidth="1.5" />

                {(() => {
                  const midX = (points[0].x + points[1].x) / 2 + 12;
                  const midY = (points[0].y + points[1].y) / 2;
                  return (
                    <g transform={`translate(${midX}, ${midY - 14})`}>
                      <rect width="80" height="22" rx="4" fill="rgba(10, 12, 16, 0.92)" stroke="#F59E0B" strokeWidth="1" />
                      <text x="40" y="15" fill="#F59E0B" fontFamily="monospace" fontSize="12" fontWeight="bold" textAnchor="middle">
                        {currentDistanceMm} {t.admin.dicom.mmUnit}
                      </text>
                    </g>
                  );
                })()}
              </g>
            )}
          </svg>
        </div>

        {/* Клинический вывод */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-stone-500 uppercase text-[10px] block font-bold">{t.admin.dicom.conclusionLabel}</span>
            <p className="font-sans font-medium text-stone-900">{selectedScan.suggestedAction}</p>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-stone-200 flex-shrink-0">
            <span className="text-stone-500">{t.admin.dicom.boneMeasureLabel}</span>
            <span className="text-base font-bold text-amber-700 font-mono">
              {currentDistanceMm} {t.admin.dicom.mmUnit}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};