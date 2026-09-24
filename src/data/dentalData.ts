import type { ToothDef, Procedure, ArbitrageMarket, ResortHotel, Currency, Language } from '../types/dental';

export const CURRENCY_CONFIG: Record<Currency, { symbol: string; rate: number }> = {
  EUR: { symbol: '€', rate: 1 },
  USD: { symbol: '$', rate: 1.09 },
  GBP: { symbol: '£', rate: 0.85 },
  EGP: { symbol: 'E£', rate: 53.2 },
};

export const PROCEDURES: Procedure[] = [
  { 
    id: 'veneer', 
    title: 'Виниры E-Max Master', 
    subtitle: 'Прессованная полевошпатная керамика Ivoclar Vivadent', 
    basePriceEUR: 270,
    daysRequired: 5,
    visits: 2,
    warranty: '10 лет международной гарантии'
  },
  { 
    id: 'implant', 
    title: 'Имплантация Straumann BLX', 
    subtitle: 'Швейцарский сплав Roxolid с анатомической циркониевой коронкой', 
    basePriceEUR: 620,
    daysRequired: 6,
    visits: 3,
    warranty: 'Пожизненная заводская гарантия'
  },
  { 
    id: 'zirconia', 
    title: 'Коронки Prettau Zirconia', 
    subtitle: 'Монолитный диоксид циркония с естественной светопроницаемостью', 
    basePriceEUR: 230,
    daysRequired: 4,
    visits: 2,
    warranty: '7 лет гарантии'
  }
];

export const ARBITRAGE_MARKETS: ArbitrageMarket[] = [
  { country: 'Великобритания', city: 'Лондон (Harley St.)', currency: 'GBP', avgVeneerCost: 950, avgImplantCost: 2400, flag: '🇬🇧' },
  { country: 'Германия', city: 'Мюнхен (Privatklinik)', currency: 'EUR', avgVeneerCost: 900, avgImplantCost: 2200, flag: '🇩🇪' },
  { country: 'Швейцария', city: 'Цюрих (Zahnarzt)', currency: 'EUR', avgVeneerCost: 1400, avgImplantCost: 3100, flag: '🇨🇭' },
  { country: 'Италия', city: 'Милан (Studio Privato)', currency: 'EUR', avgVeneerCost: 850, avgImplantCost: 1950, flag: '🇮🇹' },
];

export const RESORT_HOTELS: ResortHotel[] = [
  { name: 'Four Seasons Resort Sharm El Sheikh', district: 'Sharks Bay', eta: '12 мин' },
  { name: 'Rixos Premium Seagate', district: 'Nabq Bay', eta: '18 мин' },
  { name: 'Steigenberger Alcazar', district: 'Nabq Bay', eta: '20 мин' },
  { name: 'The Ritz-Carlton Reserve', district: 'Hadaba', eta: '10 мин' },
  { name: 'Jaz Mirabel Beach', district: 'Nabq Bay', eta: '16 мин' },
];

export const DENTAL_FORMULA: ToothDef[] = [
  { fdi: 18, name: '18', type: 'molar', jaw: 'upper', isSmileZone: false },
  { fdi: 17, name: '17', type: 'molar', jaw: 'upper', isSmileZone: false },
  { fdi: 16, name: '16', type: 'molar', jaw: 'upper', isSmileZone: false },
  { fdi: 15, name: '15', type: 'premolar', jaw: 'upper', isSmileZone: false },
  { fdi: 14, name: '14', type: 'premolar', jaw: 'upper', isSmileZone: true },
  { fdi: 13, name: '13', type: 'canine', jaw: 'upper', isSmileZone: true },
  { fdi: 12, name: '12', type: 'lateral', jaw: 'upper', isSmileZone: true },
  { fdi: 11, name: '11', type: 'central', jaw: 'upper', isSmileZone: true },
  { fdi: 21, name: '21', type: 'central', jaw: 'upper', isSmileZone: true },
  { fdi: 22, name: '22', type: 'lateral', jaw: 'upper', isSmileZone: true },
  { fdi: 23, name: '23', type: 'canine', jaw: 'upper', isSmileZone: true },
  { fdi: 24, name: '24', type: 'premolar', jaw: 'upper', isSmileZone: true },
  { fdi: 25, name: '25', type: 'premolar', jaw: 'upper', isSmileZone: false },
  { fdi: 26, name: '26', type: 'molar', jaw: 'upper', isSmileZone: false },
  { fdi: 27, name: '27', type: 'molar', jaw: 'upper', isSmileZone: false },
  { fdi: 28, name: '28', type: 'molar', jaw: 'upper', isSmileZone: false },

  { fdi: 48, name: '48', type: 'molar', jaw: 'lower', isSmileZone: false },
  { fdi: 47, name: '47', type: 'molar', jaw: 'lower', isSmileZone: false },
  { fdi: 46, name: '46', type: 'molar', jaw: 'lower', isSmileZone: false },
  { fdi: 45, name: '45', type: 'premolar', jaw: 'lower', isSmileZone: false },
  { fdi: 44, name: '44', type: 'premolar', jaw: 'lower', isSmileZone: true },
  { fdi: 43, name: '43', type: 'canine', jaw: 'lower', isSmileZone: true },
  { fdi: 42, name: '42', type: 'lateral', jaw: 'lower', isSmileZone: true },
  { fdi: 41, name: '41', type: 'central', jaw: 'lower', isSmileZone: true },
  { fdi: 31, name: '31', type: 'central', jaw: 'lower', isSmileZone: true },
  { fdi: 32, name: '32', type: 'lateral', jaw: 'lower', isSmileZone: true },
  { fdi: 33, name: '33', type: 'canine', jaw: 'lower', isSmileZone: true },
  { fdi: 34, name: '34', type: 'premolar', jaw: 'lower', isSmileZone: true },
  { fdi: 35, name: '35', type: 'premolar', jaw: 'lower', isSmileZone: false },
  { fdi: 36, name: '36', type: 'molar', jaw: 'lower', isSmileZone: false },
  { fdi: 37, name: '37', type: 'molar', jaw: 'lower', isSmileZone: false },
  { fdi: 38, name: '38', type: 'molar', jaw: 'lower', isSmileZone: false },
];

export const getProcedures = (lang: Language): Procedure[] => {
  if (lang === 'en') {
    return [
      {
        id: 'veneer-emax',
        title: 'Ivoclar IPS e.max Press',
        subtitle: 'Artisan hand-layered micro-ceramics. Thickness 0.3 mm with zero vital tooth crowning.',
        basePriceEUR: 270,
        daysRequired: 5,
        visits: 2,
        warranty: '10-Year Certified International Warranty'
      },
      {
        id: 'implant-straumann',
        title: 'Straumann BLX Roxolid',
        subtitle: 'Immediate loading protocol with SLActive bio-surface. Crown seated in 72 hours.',
        basePriceEUR: 620,
        daysRequired: 6,
        visits: 3,
        warranty: 'Lifetime Manufacturer Warranty'
      },
      {
        id: 'zirconia-prettau',
        title: 'Prettau Zirconia Full-Arch',
        subtitle: 'Monolithic translucent zirconia. 1100 MPa strength for high-load posterior aesthetics.',
        basePriceEUR: 230,
        daysRequired: 4,
        visits: 2,
        warranty: '7-Year Certified Clinical Warranty'
      }
    ];
  }

  return PROCEDURES;
};

