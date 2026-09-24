import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<Props> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'scanning' | 'complete' | 'dissolving' | 'done'>('scanning');
  const [progress, setProgress] = useState(0);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Хронометраж проката лазера — 1.5 секунды
  const SCAN_DURATION = 1500;

  useEffect(() => {
    const handleFrame = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const p = Math.min(elapsed / SCAN_DURATION, 1);

      // Плавная кубическая кривая хода
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setProgress(eased * 100);

      if (p < 1) {
        animRef.current = requestAnimationFrame(handleFrame);
      } else {
        setPhase('complete');
        // Фиксация проявленного логотипа и бесшовное растворение
        setTimeout(() => setPhase('dissolving'), 500);
        setTimeout(() => {
          setPhase('done');
          onComplete();
        }, 1100);
      }
    };

    animRef.current = requestAnimationFrame(handleFrame);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        skip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const skip = () => {
    setPhase('dissolving');
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 350);
  };

  if (phase === 'done') return null;

  // Траектория луча: от левого края круга (240px) до правого (760px)
  const laserX = 240 + (520 * (progress / 100));

  // Плавный микроповорот нониуса
  const reticleAngle = (progress / 100) * 24;

  return (
    <div 
      onClick={skip}
      className={`fixed inset-0 z-[100] bg-[#FAF7F2] text-[#1E1D1B] flex flex-col justify-between p-6 sm:p-10 select-none cursor-pointer overflow-hidden transition-all duration-700 ease-out font-sans ${
        phase === 'dissolving' 
          ? 'opacity-0 scale-[1.01] blur-sm pointer-events-none' 
          : 'opacity-100 scale-100 blur-0'
      }`}
    >
      {/* 1. ВЕРХНЯЯ СТРОКА: ТИХАЯ КНОПКА ПРОПУСКА */}
      <div className="relative z-20 flex items-center justify-end text-xs font-mono">
        <button
          onClick={(e) => {
            e.stopPropagation();
            skip();
          }}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-stone-200 hover:border-[#B89369] hover:bg-white transition-all text-[11px] text-stone-500 hover:text-stone-900 font-mono tracking-wider uppercase shadow-2xs"
        >
          <span>Пропустить</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#B89369] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 2. ЦЕНТРАЛЬНАЯ СЦЕНА: ТОЛЬКО КРУГ И ЛАЗЕР НА ЕДИНОМ ФОНЕ */}
      <div className="my-auto flex items-center justify-center">
        <div className="relative w-full max-w-[900px] aspect-[16/9] flex items-center justify-center">
          
          <svg 
            viewBox="0 0 1000 520" 
            className="w-full h-full object-contain relative z-10 overflow-visible"
            shapeRendering="geometricPrecision"
          >
            <defs>
              {/* Динамическая маска: всё левее лазера мгновенно проявляется из чистого пространства */}
              <clipPath id="laserRevealWindow">
                <rect x="0" y="0" width={laserX} height="520" />
              </clipPath>

              {/* Мягкий шлейф остывания прямо за лучом */}
              <linearGradient id="laserTrail" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#B89369" stopOpacity="0.28"/>
                <stop offset="40%" stopColor="#B89369" stopOpacity="0.06"/>
                <stop offset="100%" stopColor="#B89369" stopOpacity="0"/>
              </linearGradient>

              {/* Лазерный световой срез */}
              <linearGradient id="laserBeam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B89369" stopOpacity="0"/>
                <stop offset="25%" stopColor="#B89369" stopOpacity="0.25"/>
                <stop offset="50%" stopColor="#B89369" stopOpacity="0.95"/>
                <stop offset="75%" stopColor="#B89369" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#B89369" stopOpacity="0"/>
              </linearGradient>
            </defs>

            {/* СЛОЙ 1: ЧИСТЫЙ ОПТИЧЕСКИЙ ЛИМБ (R = 230) */}
            <g id="optical-reticle">
              {/* Внешний круговой контур */}
              <circle cx="500" cy="260" r="230" fill="none" stroke="#2D2A26" strokeWidth="1.2" opacity="0.32" />
              
              {/* Внутренний латунный пунктир */}
              <circle cx="500" cy="260" r="208" fill="none" stroke="#B89369" strokeWidth="1" strokeDasharray="3 6" opacity="0.55" />

              {/* Вращающиеся деления нониуса по периметру круга */}
              <g transform={`rotate(${reticleAngle}, 500, 260)`}>
                {Array.from({ length: 72 }).map((_, i) => {
                  const angle = (i * 360) / 72;
                  const isMajor = i % 18 === 0;
                  const isMedium = i % 6 === 0;
                  const rad = (angle * Math.PI) / 180;
                  const rInner = isMajor ? 208 : isMedium ? 216 : 222;
                  const rOuter = 230;

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

              {/* Тонкие перекрестия видоискателя с зазором под текст */}
              <line x1="500" y1="20" x2="500" y2="140" stroke="#2D2A26" strokeWidth="1" opacity="0.3" />
              <line x1="500" y1="380" x2="500" y2="500" stroke="#2D2A26" strokeWidth="1" opacity="0.3" />
              <line x1="180" y1="260" x2="250" y2="260" stroke="#2D2A26" strokeWidth="1" opacity="0.3" />
              <line x1="750" y1="260" x2="820" y2="260" stroke="#2D2A26" strokeWidth="1" opacity="0.3" />
            </g>

            {/* СЛОЙ 2: ПРОЯВЛЕНИЕ ЛОГОТИПА ИЗ ПУСТОТЫ (СТРОГО В ЦЕНТРЕ КРУГА) */}
            <g id="brand-reveal" clipPath="url(#laserRevealWindow)">
              {/* Монументальное имя AURA в глубоком графите */}
              <text
                x="500"
                y="262"
                textAnchor="middle"
                fontFamily="'Playfair Display', Georgia, serif"
                fontSize="84"
                fontWeight="600"
                letterSpacing="0.26em"
                fill="#141312"
              >
                AURA
              </text>

              {/* Лаконичный подзаголовок */}
              <g transform="translate(0, 302)">
                <line x1="280" y1="-4" x2="360" y2="-4" stroke="#9E7444" strokeWidth="0.8" opacity="0.6" />
                
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

                <line x1="640" y1="-4" x2="720" y2="-4" stroke="#9E7444" strokeWidth="0.8" opacity="0.6" />
              </g>
            </g>

            {/* СЛОЙ 3: ПРОКАТЫВАЮЩИЙСЯ ЛАЗЕРНЫЙ СРЕЗ */}
            {progress < 99.5 && (
              <g id="laser-beam">
                {/* Остывающий золотистый шлейф */}
                <rect
                  x={laserX - 50}
                  y="40"
                  width="50"
                  height="440"
                  fill="url(#laserTrail)"
                />

                {/* Ореол рассеивания луча */}
                <rect
                  x={laserX - 12}
                  y="40"
                  width="24"
                  height="440"
                  fill="url(#laserBeam)"
                />

                {/* Фронтальная латунная линия */}
                <line
                  x1={laserX}
                  y1="40"
                  x2={laserX}
                  y2="480"
                  stroke="#B89369"
                  strokeWidth="2.5"
                />

                {/* Контрастная графитовая нить по центру (1.2px) */}
                <line
                  x1={laserX}
                  y1="40"
                  x2={laserX}
                  y2="480"
                  stroke="#1A1816"
                  strokeWidth="1.2"
                />

                {/* Концевые маркеры луча */}
                <circle cx={laserX} cy="40" r="3.5" fill="#1A1816" stroke="#B89369" strokeWidth="1.5" />
                <circle cx={laserX} cy="480" r="3.5" fill="#1A1816" stroke="#B89369" strokeWidth="1.5" />
              </g>
            )}

          </svg>
        </div>
      </div>

      {/* 3. НИЖНЯЯ ПУСТАЯ ОБЛАСТЬ ДЛЯ БАЛАНСА ВЕРТИКАЛИ */}
      <div className="h-6" />

    </div>
  );
};