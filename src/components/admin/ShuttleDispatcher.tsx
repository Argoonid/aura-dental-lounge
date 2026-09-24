import React, { useState } from 'react';
import { RESORT_HOTELS } from '../../data/dentalData';
import { CustomSelect } from '../ui/CustomSelect';
import { useLanguage } from '../../context/LanguageContext';
import { Car, Send, MapPin } from 'lucide-react';

export const ShuttleDispatcher: React.FC = () => {
  const { t, lang } = useLanguage();

  const [cars, setCars] = useState([
    { 
      id: 1, 
      model: 'Mercedes V-Class (Белый, 8241)', 
      driver: lang === 'en' ? 'Karim Said' : 'Карим Саид', 
      hotel: 'Rixos Premium Seagate', 
      status: t.admin.shuttle.statuses.enRoute, 
      eta: '12 min' 
    },
    { 
      id: 2, 
      model: 'Toyota Camry (Серый, 1109)', 
      driver: lang === 'en' ? 'Ahmed Mansour' : 'Ахмед Мансур', 
      hotel: 'Four Seasons Resort', 
      status: t.admin.shuttle.statuses.onSite, 
      eta: '0 min' 
    },
  ]);

  const hotelOptions = RESORT_HOTELS.map(h => ({
    value: h.name,
    label: h.name,
    sublabel: `${h.district} • ${h.eta}`
  }));

  const updateCarStatus = (id: number, status: string) => {
    setCars(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const updateCarHotel = (id: number, hotelName: string) => {
    const h = RESORT_HOTELS.find(item => item.name === hotelName);
    setCars(prev => prev.map(c => c.id === id ? { ...c, hotel: hotelName, eta: h ? h.eta : '15 min' } : c));
  };

  const availableStatuses = [
    t.admin.shuttle.statuses.enRoute,
    t.admin.shuttle.statuses.waiting,
    t.admin.shuttle.statuses.returning
  ];

  return (
    <div className="space-y-4 font-sans">
      <div className="flex justify-between items-center pb-2 border-b border-stone-200 text-xs font-mono">
        <h3 className="text-sm font-bold text-stone-900 font-sans">{t.admin.shuttle.title}</h3>
        <span className="text-stone-500">{t.admin.shuttle.activeCount}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cars.map(car => (
          <div key={car.id} className="p-6 rounded-3xl bg-white border border-stone-200 space-y-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold text-stone-900 font-sans">{car.model}</h4>
                <p className="text-xs text-stone-500 font-mono mt-0.5">{t.admin.shuttle.driverLabel} {car.driver}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold ${
                car.status === t.admin.shuttle.statuses.onSite
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-100 text-amber-900'
              }`}>
                {car.status}
              </span>
            </div>

            <div className="space-y-1 text-xs font-mono">
              <label className="text-stone-500 block uppercase font-medium">{t.admin.shuttle.assignedHotel}</label>
              <CustomSelect
                value={car.hotel}
                options={hotelOptions}
                onChange={val => updateCarHotel(car.id, val)}
              />
            </div>

            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {availableStatuses.map(st => (
                <button
                  key={st}
                  onClick={() => updateCarStatus(car.id, st)}
                  className={`px-3 py-1.5 rounded-xl border text-[11px] transition-all ${
                    car.status === st 
                      ? 'bg-stone-900 text-white font-bold border-stone-900 shadow-sm' 
                      : 'bg-[#FAF7F2] text-stone-600 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <a
              href={`https://wa.me/201000000000?text=${encodeURIComponent(
                lang === 'en'
                  ? `Route: ${car.hotel}. Pickup ETA: ${car.eta}. Patient waiting at main lobby.`
                  : `Маршрут: ${car.hotel}. Время подачи: ${car.eta}. Пациент ожидает у центрального лобби.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-xl text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#B89369]" /> {t.admin.shuttle.whatsappBtn}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};