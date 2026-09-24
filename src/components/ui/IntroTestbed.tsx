import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, ArrowRight, Sliders, CheckCircle2 
} from 'lucide-react';

interface Props {
  onComplete?: () => void;
}

// 14 анатомических позиций дуги зубов (расположены строго под логотипом)
const TEETH_NODES = [
  { fdi: 17, x: 240, y: 310, name: 'Моляр' },
  { fdi: 16, x: 280, y: 328, name: 'Моляр' },
  { fdi: 15, x: 320, y: 344, name: 'Премоляр' },
  { fdi: 14, x: 360, y: 356, name: 'Премоляр' },
  { fdi: 13, x: 400, y: 365, name: 'Клык' },
  { fdi: 12, x: 440, y: 372, name: 'Боковой резец' },
  { fdi: 11, x: 480, y: 375, name: 'Центральный' },
  { fdi: 21, x: 520, y: 375, name: 'Центральный' },
  { fdi: 22, x: 560, y: 372, name: 'Боковой резец' },
  { fdi: 23, x: 600, y: 365, name: 'Клык' },
  { fdi: 24, x: 640, y: 356, name: 'Премоляр' },
  { fdi: 25, x: 680, y: 344, name: 'Премоляр' },
  { fdi: 26, x: 720, y: 328, name: 'Моляр' },
  { fdi: 27, x: 760, y: 310, name: 'Моляр' },
];

export const IntroTestbed: React.FC<Props> = ({ onComplete }) => {
  const [timeline, setTimeline] = useState(40);
  const [isPlaying, setIsPlaying] = useState(true);

  // Переключение видимости слоев для проверки
  const [showReticle, setShowReticle] = useState(true);
  const [showArch, setShowArch] = useState(true);
  const [showLaser, setShowLaser] = useState(true);
  const [showBrand, setShowBrand] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimeline(prev => {
        if (prev >= 100) return 0;
        return prev + 0.4;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Движение лазера от 160px (до начала текста) до 840px (после зубов)
  const laserX = 160 + (680 * (timeline / 100));

  // Угол вращения лимба
  const reticleAngle = (timeline / 100) * 35;

  return (
    <div className="fixed inset-0 z-[100] bg-[#FAF7F2] text-[#1E1D1B] flex flex-col justify-between font-sans select-none overflow-hidden">
      
      {/* 1. ВЕРХНЯЯ ПАНЕЛЬ СТЕНДА */}
      <div className="bg-white border-b border-stone-200 px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B89369] animate-pulse" />
            <div>
              <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-stone-900">
                Visual Lab • Wide Reticle & Dynamic Reveal
              </h2>
              <p className="text-[10px] font-mono text-stone-500">
                Широкий оптический круг (R=240), центрированный логотип и проявление из пустоты
              </p>
            </div>
          </div>

          {/* Фильтры слоев */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-xl border border-stone-200 text-xs font-mono">
            <button
              onClick={() => setShowReticle(!showReticle)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                showReticle ? 'bg-stone-900 text-white font-bold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              1. Широкий круг
            </button>
            <button
              onClick={() => setShowBrand(!showBrand)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                showBrand ? 'bg-stone-900 text-white font-bold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              2. Проявление AURA
            </button>
            <button
              onClick={() => setShowArch(!showArch)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                showArch ? 'bg-stone-900 text-white font-bold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              3. Дуга зубов
            </button>
            <button
              onClick={() => setShowLaser(!showLaser)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                showLaser ? 'bg-stone-900 text-white font-bold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              4. Лазерный луч
            </button>
          </div>

          {onComplete && (
            <button
              onClick={onComplete}
              className="px-4 py-2 bg-stone-900 hover:bg-[#B89369] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Принять и войти на сайт</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

        </div>
      </div>

      {/* 2. ГЛАВНАЯ СЦЕНА ВЕКТОРНОГО РЕНДЕРА */}
      <div className="my-auto flex items-center justify-center p-6">
        <div className="relative w-full max-w-[980px] aspect-[16/9] bg-white rounded-3xl border border-stone-300 shadow-xl overflow-hidden flex items-center justify-center">
          
          {/* Фоновая миллиметровая архитектурная сетка */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#EFEBE1_1px,transparent_1px),linear-gradient(to_bottom,#EFEBE1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)] opacity-70 pointer-events-none" />

          {/* Угловые прицельные рамки */}
          <div className="absolute top-5 left-5 font-mono text-[10px] text-stone-400">
            [ + ] OPTICAL CENTER: 500, 260
          </div>
          <div className="absolute top-5 right-5 font-mono text-[10px] text-stone-400">
            RETICLE RADIUS: 240 mm [ + ]
          </div>
          <div className="absolute bottom-5 left-5 font-mono text-[10px] text-stone-400">
            SYSTEM: 3Shape TRIOS 5 • Swiss CAD/CAM
          </div>
          <div className="absolute bottom-5 right-5 font-mono text-[10px] text-[#B89369] font-bold">
            SCAN: {timeline.toFixed(0)}%
          </div>

          <svg 
            viewBox="0 0 1000 520" 
            className="w-full h-full object-contain relative z-10 overflow-visible"
            shapeRendering="geometricPrecision"
          >
            <defs>
              {/* Динамическая маска проявления: всё, что ЛЕВЕЕ луча, становится видимым */}
              <clipPath id="laserRevealMask">
                <rect x="0" y="0" width={laserX} height="520" />
              </clipPath>

              {/* Золотой теплый шлейф остывания прямо за лазером */}
              <linearGradient id="coolDownGlow" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#B89369" stopOpacity="0.35"/>
                <stop offset="35%" stopColor="#B89369" stopOpacity="0.12"/>
                <stop offset="100%" stopColor="#B89369" stopOpacity="0"/>
              </linearGradient>

              {/* Лазерный световой луч */}
              <linearGradient id="laserBeamGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B89369" stopOpacity="0"/>
                <stop offset="25%" stopColor="#B89369" stopOpacity="0.25"/>
                <stop offset="50%" stopColor="#B89369" stopOpacity="0.95"/>
                <stop offset="75%" stopColor="#B89369" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#B89369" stopOpacity="0"/>
              </linearGradient>
            </defs>

            {/* СЛОЙ 1: ШИРОКИЙ ОПТИЧЕСКИЙ ЛИМБ (R = 240 mm) */}
            {showReticle && (
              <g id="wide-reticle-layer">
                {/* Внешний основной круговой контур */}
                <circle cx="500" cy="260" r="240" fill="none" stroke="#2D2A26" strokeWidth="1.2" opacity="0.35" />
                
                {/* Тонкий внутренний латунный пунктир */}
                <circle cx="500" cy="260" r="215" fill="none" stroke="#B89369" strokeWidth="1" strokeDasharray="3 6" opacity="0.6" />

                {/* Вращающиеся деления нониуса по всему периметру большого круга */}
                <g transform={`rotate(${reticleAngle}, 500, 260)`}>
                  {Array.from({ length: 72 }).map((_, i) => {
                    const angle = (i * 360) / 72;
                    const isMajor = i % 18 === 0;
                    const isMedium = i % 6 === 0;
                    const rad = (angle * Math.PI) / 180;
                    const rInner = isMajor ? 218 : isMedium ? 226 : 232;
                    const rOuter = 240;

                    return (
                      <line
                        key={i}
                        x1={500 + Math.cos(rad) * rInner}
                        y1={260 + Math.sin(rad) * rInner}
                        x2={500 + Math.cos(rad) * rOuter}
                        y2={260 + Math.sin(rad) * rOuter}
                        stroke={isMajor ? '#9E7444' : isMedium ? '#2D2A26' : '#D0C9BD'}
                        strokeWidth={isMajor ? 2 : 1}
                      />
                    );
                  })}
                </g>

                {/* Оси прицела с зазором под логотип */}
                <line x1="500" y1="20" x2="500" y2="120" stroke="#2D2A26" strokeWidth="1" opacity="0.35" />
                <line x1="500" y1="400" x2="500" y2="500" stroke="#2D2A26" strokeWidth="1" opacity="0.35" />
                <line x1="180" y1="260" x2="250" y2="260" stroke="#2D2A26" strokeWidth="1" opacity="0.35" />
                <line x1="750" y1="260" x2="820" y2="260" stroke="#2D2A26" strokeWidth="1" opacity="0.35" />
              </g>
            )}

            {/* СЛОЙ 2: АНАТОМИЧЕСКАЯ ПАРАБОЛА ЗУБОВ (Расположена ниже логотипа) */}
            {showArch && (
              <g id="dental-arch-layer">
                {/* Базовый легкий пунктирный ориентир дуги */}
                <path
                  d="M 240,310 Q 500,440 760,310"
                  fill="none"
                  stroke="#2D2A26"
                  strokeWidth="1.2"
                  strokeDasharray="4 6"
                  opacity="0.25"
                />

                {/* Проявленная часть золотой дуги (строго позади лазера) */}
                <path
                  d="M 240,310 Q 500,440 760,310"
                  fill="none"
                  stroke="#B89369"
                  strokeWidth="2"
                  clipPath="url(#laserRevealMask)"
                />

                {/* 14 анатомических зубов FDI */}
                {TEETH_NODES.map(tooth => {
                  const isRevealed = tooth.x <= laserX;
                  const distToLaser = Math.abs(tooth.x - laserX);
                  const isCurrentlyHit = distToLaser < 24;

                  return (
                    <g key={tooth.fdi}>
                      {/* Если луч еще не дошел — точка едва заметна как тонкий серый контур */}
                      {!isRevealed && (
                        <circle cx={tooth.x} cy={tooth.y} r="3" fill="none" stroke="#D0C9BD" strokeWidth="1" />
                      )}

                      {/* Если луч прошел — зуб проявлен в глубоком контрасте */}
                      {isRevealed && (
                        <g>
                          {/* Вспышка в момент прохода лазера */}
                          {isCurrentlyHit && (
                            <circle cx={tooth.x} cy={tooth.y} r="18" fill="#B89369" opacity="0.25" />
                          )}

                          {/* Внешнее золотое кольцо */}
                          <circle
                            cx={tooth.x}
                            cy={tooth.y}
                            r={isCurrentlyHit ? 7 : 5}
                            fill="#FFFFFF"
                            stroke={isCurrentlyHit ? '#9E7444' : '#2D2A26'}
                            strokeWidth={isCurrentlyHit ? 2.5 : 1.5}
                          />

                          {/* Темное графитовое ядро */}
                          <circle
                            cx={tooth.x}
                            cy={tooth.y}
                            r={isCurrentlyHit ? 3.5 : 2.2}
                            fill={isCurrentlyHit ? '#B89369' : '#1A1816'}
                          />

                          {/* Всплывающий номер зуба FDI в момент прохода */}
                          {isCurrentlyHit && (
                            <g transform={`translate(${tooth.x - 18}, ${tooth.y + 14})`}>
                              <rect width="36" height="18" rx="4" fill="#1A1816" stroke="#B89369" strokeWidth="1" />
                              <text x="18" y="13" textAnchor="middle" fill="#FFFFFF" fontFamily="monospace" fontSize="10" fontWeight="bold">
                                {tooth.fdi}
                              </text>
                            </g>
                          )}
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            )}

            {/* СЛОЙ 3: ПРОЯВЛЕНИЕ ЛОГОТИПА ИЗ ПУСТОТЫ (Strictly Revealed behind laser) */}
            {showBrand && (
              <g id="brand-reveal-layer" clipPath="url(#laserRevealMask)">
                
                {/* Монументальное имя AURA в глубоком графите */}
                <text
                  x="500"
                  y="210"
                  textAnchor="middle"
                  fontFamily="'Playfair Display', Georgia, serif"
                  fontSize="78"
                  fontWeight="600"
                  letterSpacing="0.26em"
                  fill="#141312"
                >
                  AURA
                </text>

                {/* Центрированный подзаголовок с латунными линиями-разделителями */}
                <g transform="translate(0, 245)">
                  <line x1="260" y1="-4" x2="350" y2="-4" stroke="#9E7444" strokeWidth="0.8" opacity="0.6" />
                  
                  <text
                    x="500"
                    y="0"
                    textAnchor="middle"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    fontSize="10.5"
                    fontWeight="800"
                    letterSpacing="0.45em"
                    fill="#9E7444"
                  >
                    DENTAL LOUNGE • SHARM EL SHEIKH
                  </text>

                  <line x1="650" y1="-4" x2="740" y2="-4" stroke="#9E7444" strokeWidth="0.8" opacity="0.6" />
                </g>

              </g>
            )}

            {/* СЛОЙ 4: ПРОКАТЫВАЮЩИЙСЯ ЛАЗЕРНЫЙ СРЕЗ */}
            {showLaser && (
              <g id="laser-beam-layer">
                {/* Теплый золотой след позади луча */}
                <rect
                  x={laserX - 45}
                  y="60"
                  width="45"
                  height="400"
                  fill="url(#coolDownGlow)"
                />

                {/* Широкий ореол самого луча */}
                <rect
                  x={laserX - 12}
                  y="60"
                  width="24"
                  height="400"
                  fill="url(#laserBeamGrad)"
                />

                {/* Золотая фронтальная линия */}
                <line
                  x1={laserX}
                  y1="60"
                  x2={laserX}
                  y2="460"
                  stroke="#B89369"
                  strokeWidth="2.5"
                />

                {/* Резкая графитовая нить по центру (обеспечивает читаемость на светлом) */}
                <line
                  x1={laserX}
                  y1="60"
                  x2={laserX}
                  y2="460"
                  stroke="#1A1816"
                  strokeWidth="1.2"
                />

                {/* Бегущие концевые маркеры */}
                <circle cx={laserX} cy="60" r="3.5" fill="#1A1816" stroke="#B89369" strokeWidth="1.5" />
                <circle cx={laserX} cy="460" r="3.5" fill="#1A1816" stroke="#B89369" strokeWidth="1.5" />
              </g>
            )}

          </svg>
        </div>
      </div>

      {/* 3. НИЖНЯЯ ПАНЕЛЬ УПРАВЛЕНИЯ ТАЙМЛАЙНОМ */}
      <div className="bg-white border-t border-stone-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#B89369]" /> : <Play className="w-3.5 h-3.5 text-[#B89369]" />}
              <span>{isPlaying ? 'Пауза' : 'Воспроизведение'}</span>
            </button>

            <button
              onClick={() => setTimeline(0)}
              className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
              title="Сброс в начало"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Интерактивный ползунок */}
          <div className="flex-1 max-w-xl mx-4 flex items-center space-x-3 w-full">
            <span className="text-xs font-mono text-stone-500 whitespace-nowrap">0% (Пусто)</span>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={timeline}
              onChange={e => {
                setIsPlaying(false);
                setTimeline(Number(e.target.value));
              }}
              className="w-full cursor-ew-resize accent-[#B89369]"
            />
            <span className="text-xs font-mono text-stone-900 font-bold whitespace-nowrap">
              {timeline.toFixed(1)}% (Проявлено)
            </span>
          </div>

          <div className="text-xs font-mono text-stone-500 hidden lg:block">
            <span>ЛАЗЕР X: </span>
            <strong className="text-stone-900">{laserX.toFixed(0)} px</strong>
          </div>

        </div>
      </div>

    </div>
  );
};