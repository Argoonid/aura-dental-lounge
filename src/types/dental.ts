export type Language = 'ru' | 'en';
export type Currency = 'EUR' | 'USD' | 'GBP' | 'EGP';
export type JawType = 'upper' | 'lower';
export type PageRoute = 'home' | 'catalog' | 'admin';

export type CatalogCategory = 'all' | 'aesthetic' | 'implants' | 'spa' | 'microscope';

export type SosStatus = 
  | 'sos_new' 
  | 'sos_transfer' 
  | 'sos_in_chair' 
  | 'sos_stabilized' 
  | 'sos_closed';

export type BookingStatus = 
  | 'plan_negotiation' 
  | 'plan_deposit' 
  | 'plan_scanned' 
  | 'plan_lab' 
  | 'plan_bonding' 
  | 'plan_completed';

export interface ToothDef {
  fdi: number;
  name: string;
  type: 'central' | 'lateral' | 'canine' | 'premolar' | 'molar';
  jaw: JawType;
  isSmileZone: boolean;
}

export interface Procedure {
  id: string;
  title: string;
  subtitle: string;
  basePriceEUR: number;
  daysRequired: number;
  visits: number;
  warranty: string;
}

export interface ArbitrageMarket {
  country: string;
  city: string;
  currency: Currency;
  avgVeneerCost: number;
  avgImplantCost: number;
  flag: string;
}

export interface ResortHotel {
  name: string;
  district: string;
  eta: string;
}

export interface CatalogItem {
  id: string;
  title: string;
  category: 'aesthetic' | 'implants' | 'spa' | 'microscope';
  categoryLabel: string;
  material: string;
  imageUrl: string;
  basePriceEUR: number;
  ukAvgPriceEUR: number;
  daysInResort: number;
  visitsRequired: number;
  flightClearanceHours: number;
  warranty: string;
  description: string;
  tags: string[];
}

export interface SosIncident {
  id: string;
  createdAt: string;
  clientName: string;
  countryFlag: string;
  hotel: string;
  room: string;
  symptom: string;
  painLevel: 'moderate' | 'acute' | 'unbearable';
  status: SosStatus;
  flightHoursLeft: number;
  driverAssigned?: string;
  costEUR: number;
}

export interface DentalBooking {
  id: string;
  createdAt: string;
  clientName: string;
  countryFlag: string;
  hotel: string;
  procedureTitle: string;
  unitsCount: number;
  totalEUR: number;
  depositEUR: number;
  checkInDate: string;
  checkOutDate: string;
  flightHoursLeft: number;
  status: BookingStatus;
  labTechnician?: string;
}