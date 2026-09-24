import React, { useState } from 'react';
import type { SosIncident, DentalBooking, SosStatus, BookingStatus, Language } from '../../types/dental';
import { useLanguage } from '../../context/LanguageContext';

import { TriageModule } from './TriageModule';
import { TreatmentDeckBuilder } from './TreatmentDeckBuilder';
import { DicomViewer } from './DicomViewer';
import { ShuttleDispatcher } from './ShuttleDispatcher';
import { SuperbillGenerator } from './SuperbillGenerator';

const getInitialSos = (lang: Language): SosIncident[] => [
  {
    id: 'sos-01',
    createdAt: '14:22',
    clientName: 'Matteo Moretti',
    countryFlag: '🇮🇹',
    hotel: 'Rixos Premium Seagate',
    room: 'Suite 2104',
    symptom: lang === 'en' 
      ? 'Acute throbbing pain (upper molar 16)' 
      : 'Острая пульсирующая боль (верхний моляр 16)',
    painLevel: 'unbearable',
    status: 'sos_new',
    flightHoursLeft: 18,
    driverAssigned: lang === 'en' ? 'Karim (Mercedes V-Class)' : 'Карим (Mercedes V-Class)',
    costEUR: 350
  },
  {
    id: 'sos-02',
    createdAt: '11:10',
    clientName: 'Charlotte Davies',
    countryFlag: '🇬🇧',
    hotel: 'Steigenberger Alcazar',
    room: 'Room 418',
    symptom: lang === 'en'
      ? 'Chipped ceramic crown prior to evening flight'
      : 'Скол керамической коронки перед вечерним вылетом',
    painLevel: 'acute',
    status: 'sos_in_chair',
    flightHoursLeft: 8,
    costEUR: 230
  }
];

const getInitialBookings = (lang: Language): DentalBooking[] => [
  {
    id: 'book-01',
    createdAt: '13:45',
    clientName: 'Alexander Bauer',
    countryFlag: '🇩🇪',
    hotel: 'Four Seasons Resort (Villa 12)',
    procedureTitle: lang === 'en' ? 'Ivoclar IPS e.max Press Veneers' : 'Виниры Ivoclar IPS e.max Press',
    unitsCount: 10,
    totalEUR: 2700,
    depositEUR: 500,
    checkInDate: lang === 'en' ? '22 Sep' : '22 Сен',
    checkOutDate: lang === 'en' ? '29 Sep' : '29 Сен',
    flightHoursLeft: 96,
    status: 'plan_lab',
    labTechnician: lang === 'en' ? 'Mark (Ivoclar Lab)' : 'Марк (Ivoclar Lab)'
  },
  {
    id: 'book-02',
    createdAt: lang === 'en' ? 'Yesterday' : 'Вчера',
    clientName: 'David Miller',
    countryFlag: '🇬🇧',
    hotel: 'The Ritz-Carlton Reserve',
    procedureTitle: lang === 'en' ? 'Straumann BLX Implantation + Crown' : 'Имплантация Straumann BLX + коронка',
    unitsCount: 2,
    totalEUR: 1240,
    depositEUR: 300,
    checkInDate: lang === 'en' ? '20 Sep' : '20 Сен',
    checkOutDate: lang === 'en' ? '28 Sep' : '28 Сен',
    flightHoursLeft: 110,
    status: 'plan_deposit',
  }
];

export const AdminDashboard: React.FC = () => {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'triage' | 'deck' | 'dicom' | 'shuttle' | 'superbill'>('triage');
  const [sosList, setSosList] = useState<SosIncident[]>(() => getInitialSos(lang));
  const [bookingList, setBookingList] = useState<DentalBooking[]>(() => getInitialBookings(lang));

  // Синхронизация текстов mock-данных при смене языка
  React.useEffect(() => {
    setSosList(getInitialSos(lang));
    setBookingList(getInitialBookings(lang));
  }, [lang]);

  const handleUpdateSosStatus = (id: string, status: SosStatus) => {
    setSosList(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const handleUpdateBookingStatus = (id: string, status: BookingStatus) => {
    setBookingList(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const urgentSosCount = sosList.filter(s => s.status === 'sos_new').length;

  const tabs: { id: typeof activeTab; label: string }[] = [
    { 
      id: 'triage', 
      label: `${t.admin.dashboard.tabs.triage} (${urgentSosCount > 0 ? `${t.admin.dashboard.urgentSosPrefix}${urgentSosCount}` : t.admin.dashboard.allLabel})` 
    },
    { id: 'deck', label: t.admin.dashboard.tabs.deck },
    { id: 'dicom', label: t.admin.dashboard.tabs.dicom },
    { id: 'shuttle', label: t.admin.dashboard.tabs.shuttle },
    { id: 'superbill', label: t.admin.dashboard.tabs.superbill },
  ];

  return (
    <div className="py-8 px-6 max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* Шапка рабочего кабинета координатора */}
      <div className="bg-white border border-stone-200 p-5 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-stone-900">{t.admin.dashboard.title}</h2>
          <p className="text-xs text-stone-500 font-mono mt-0.5">{t.admin.dashboard.subtitle}</p>
        </div>

        {/* Навигационные вкладки кабинета */}
        <div className="flex flex-wrap gap-1 bg-[#FAF7F2] p-1 rounded-2xl border border-stone-200 text-xs font-mono">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-stone-900 text-white font-bold shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Отрисовка выбранного модуля */}
      {activeTab === 'triage' && (
        <TriageModule 
          sosList={sosList} 
          bookingList={bookingList} 
          onUpdateSosStatus={handleUpdateSosStatus} 
          onUpdateBookingStatus={handleUpdateBookingStatus} 
        />
      )}

      {activeTab === 'deck' && (
        <TreatmentDeckBuilder />
      )}

      {activeTab === 'dicom' && (
        <DicomViewer />
      )}

      {activeTab === 'shuttle' && (
        <ShuttleDispatcher />
      )}

      {activeTab === 'superbill' && (
        <SuperbillGenerator />
      )}

    </div>
  );
};