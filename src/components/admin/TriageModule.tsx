import React, { useState } from 'react';
import type { SosIncident, DentalBooking, SosStatus, BookingStatus } from '../../types/dental';
import { useLanguage } from '../../context/LanguageContext';
import { CustomSelect } from '../ui/CustomSelect';
import { 
  AlertCircle, Car, Calendar, ChevronRight, 
  Plane, Search, Send 
} from 'lucide-react';

interface Props {
  sosList: SosIncident[];
  bookingList: DentalBooking[];
  onUpdateSosStatus: (id: string, status: SosStatus) => void;
  onUpdateBookingStatus: (id: string, status: BookingStatus) => void;
}

export const TriageModule: React.FC<Props> = ({
  sosList,
  bookingList,
  onUpdateSosStatus,
  onUpdateBookingStatus
}) => {
  const { t, lang } = useLanguage();
  const [activeStream, setActiveStream] = useState<'sos' | 'bookings'>('sos');
  const [search, setSearch] = useState('');

  const sosStatusMap: Record<SosStatus, { label: string; color: string; next?: SosStatus; nextLabel?: string }> = {
    sos_new: { 
      label: lang === 'en' ? '1. Incoming SOS' : '1. Новый сигнал SOS', 
      color: 'bg-rose-100 text-rose-800 border-rose-200', 
      next: 'sos_transfer', 
      nextLabel: lang === 'en' ? 'Dispatch Chauffeur' : 'Направить машину' 
    },
    sos_transfer: { 
      label: lang === 'en' ? '2. Shuttle En Route' : '2. Шаттл выслан в отель', 
      color: 'bg-amber-100 text-amber-900 border-amber-200', 
      next: 'sos_in_chair', 
      nextLabel: lang === 'en' ? 'Seat in Chair' : 'Принят в кабинет' 
    },
    sos_in_chair: { 
      label: lang === 'en' ? '3. In Operatory / Anesthesia' : '3. В кресле / Анестезия', 
      color: 'bg-blue-100 text-blue-900 border-blue-200', 
      next: 'sos_stabilized', 
      nextLabel: lang === 'en' ? 'Pain Stabilized' : 'Боль купирована' 
    },
    sos_stabilized: { 
      label: lang === 'en' ? '4. Stabilized (Temp Seal)' : '4. Стабилизирован (Врем. пломба)', 
      color: 'bg-purple-100 text-purple-900 border-purple-200', 
      next: 'sos_closed', 
      nextLabel: lang === 'en' ? 'Close Case' : 'Закрыть вызов' 
    },
    sos_closed: { 
      label: lang === 'en' ? '5. Case Closed / Settled' : '5. Случай закрыт / Оплачено', 
      color: 'bg-stone-100 text-stone-700 border-stone-200' 
    },
  };

  const bookingStatusMap: Record<BookingStatus, { label: string; color: string; next?: BookingStatus; nextLabel?: string }> = {
    plan_negotiation: { 
      label: lang === 'en' ? '1. Consultation & Dates' : '1. Согласование дат и плана', 
      color: 'bg-stone-100 text-stone-800 border-stone-200', 
      next: 'plan_deposit', 
      nextLabel: lang === 'en' ? 'Deposit Secured' : 'Депозит получен' 
    },
    plan_deposit: { 
      label: lang === 'en' ? '2. Deposit Secured / Slot Confirmed' : '2. Депозит внесен / Бронь слота', 
      color: 'bg-amber-100 text-amber-900 border-amber-200', 
      next: 'plan_scanned', 
      nextLabel: lang === 'en' ? 'Visit 1: 3D Scan' : 'Визит 1: 3D-Скан' 
    },
    plan_scanned: { 
      label: lang === 'en' ? '3. 3Shape Scan / Prep Visit' : '3. 3D-Скан снят / Препарирование', 
      color: 'bg-blue-100 text-blue-900 border-blue-200', 
      next: 'plan_lab', 
      nextLabel: lang === 'en' ? 'Milling CAD/CAM' : 'Отдать в CAD/CAM' 
    },
    plan_lab: { 
      label: lang === 'en' ? '4. Lab CAD/CAM Milling' : '4. Лаборатория (Фрезеровка)', 
      color: 'bg-indigo-100 text-indigo-900 border-indigo-200', 
      next: 'plan_bonding', 
      nextLabel: lang === 'en' ? 'Visit 2: Try-In' : 'Визит 2: Примерка' 
    },
    plan_bonding: { 
      label: lang === 'en' ? '5. Adhesive Seating' : '5. Примерка и фиксация', 
      color: 'bg-emerald-100 text-emerald-900 border-emerald-200', 
      next: 'plan_completed', 
      nextLabel: lang === 'en' ? 'Issue Fit-to-Fly' : 'Выдать Fit-to-Fly' 
    },
    plan_completed: { 
      label: lang === 'en' ? '6. Completed / Warranty Issued' : '6. Завершено / Выдан паспорт', 
      color: 'bg-stone-900 text-white border-stone-900' 
    },
  };

  const sosSelectOptions = [
    { value: 'sos_new', label: lang === 'en' ? '1. Incoming SOS' : '1. Новый сигнал' },
    { value: 'sos_transfer', label: lang === 'en' ? '2. Shuttle Dispatched' : '2. Шаттл выслан' },
    { value: 'sos_in_chair', label: lang === 'en' ? '3. In Operatory' : '3. В кресле' },
    { value: 'sos_stabilized', label: lang === 'en' ? '4. Stabilized' : '4. Стабилизирован' },
    { value: 'sos_closed', label: lang === 'en' ? '5. Case Closed' : '5. Закрыт' },
  ];

  const bookingSelectOptions = [
    { value: 'plan_negotiation', label: lang === 'en' ? '1. Consultation' : '1. Согласование' },
    { value: 'plan_deposit', label: lang === 'en' ? '2. Deposit Secured' : '2. Депозит внесен' },
    { value: 'plan_scanned', label: lang === 'en' ? '3. 3Shape Scan' : '3. Скан 3Shape' },
    { value: 'plan_lab', label: lang === 'en' ? '4. In Laboratory' : '4. В лаборатории' },
    { value: 'plan_bonding', label: lang === 'en' ? '5. Try-in & Bonding' : '5. Примерка и фиксация' },
    { value: 'plan_completed', label: lang === 'en' ? '6. Completed (Fit-to-Fly)' : '6. Завершено (Fit-to-Fly)' },
  ];

  const activeSosCount = sosList.filter(s => s.status !== 'sos_closed').length;
  const activeBookingsCount = bookingList.filter(b => b.status !== 'plan_completed').length;

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-2.5 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStream('sos')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeStream === 'sos'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>{t.admin.triage.tabSos}</span>
            {activeSosCount > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeStream === 'sos' ? 'bg-white text-rose-700' : 'bg-rose-100 text-rose-700'}`}>
                {activeSosCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveStream('bookings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeStream === 'bookings'
                ? 'bg-stone-900 text-white shadow-md'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#B89369]" />
            <span>{t.admin.triage.tabBookings}</span>
            {activeBookingsCount > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeStream === 'bookings' ? 'bg-stone-700 text-white' : 'bg-stone-200 text-stone-800'}`}>
                {activeBookingsCount}
              </span>
            )}
          </button>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.admin.triage.searchPlaceholder}
            className="w-full sm:w-64 pl-9 pr-3 py-2 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-500 font-medium"
          />
        </div>
      </div>

      {activeStream === 'sos' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1 text-xs font-mono text-stone-500">
            <span>{t.admin.triage.sosQueueTitle}</span>
            <span>{t.admin.triage.sosQueueSub}</span>
          </div>

          <div className="space-y-3">
            {sosList
              .filter(s => s.clientName.toLowerCase().includes(search.toLowerCase()) || s.hotel.toLowerCase().includes(search.toLowerCase()))
              .map(sos => {
                const currentStatus = sosStatusMap[sos.status];
                const isUrgent = sos.status === 'sos_new';
                const flightCritical = sos.flightHoursLeft < 24;

                return (
                  <div
                    key={sos.id}
                    className={`p-6 rounded-3xl bg-white border transition-all shadow-sm ${
                      isUrgent ? 'border-rose-400 ring-2 ring-rose-400/20' : 'border-stone-200'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">
                      <div className="space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-xl">{sos.countryFlag}</span>
                          <h4 className="text-base font-bold text-stone-950 font-serif">{sos.clientName}</h4>
                          <span className="text-xs font-mono text-stone-400">• {t.admin.triage.loggedAt} {sos.createdAt}</span>

                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border uppercase tracking-wider ${currentStatus.color}`}>
                            {currentStatus.label}
                          </span>

                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            sos.painLevel === 'unbearable' ? 'bg-rose-600 text-white' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {t.admin.triage.painLabel} {sos.painLevel === 'unbearable' ? t.admin.triage.painUnbearable : t.admin.triage.painAcute}
                          </span>
                        </div>

                        <p className="text-xs text-stone-800 font-medium">
                          {t.admin.triage.symptomLabel} <span className="font-semibold text-stone-950">{sos.symptom}</span>
                        </p>

                        <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-stone-600 pt-1">
                          <span className="flex items-center gap-1.5 font-semibold text-stone-900">
                            <Car className="w-3.5 h-3.5 text-[#B89369]" /> {sos.hotel} ({sos.room})
                          </span>

                          <span className={`flex items-center gap-1.5 font-semibold ${flightCritical ? 'text-amber-700' : 'text-stone-500'}`}>
                            <Plane className="w-3.5 h-3.5" /> {t.admin.triage.flightHoursLeft} {sos.flightHoursLeft} {t.admin.triage.hoursUnit}
                            {flightCritical && ` ${t.admin.triage.surgeryRestricted}`}
                          </span>

                          {sos.driverAssigned && (
                            <span className="text-stone-500">
                              {t.admin.triage.driverLabel} <strong className="text-stone-800">{sos.driverAssigned}</strong>
                            </span>
                          )}

                          <span className="text-emerald-700 font-bold">{t.admin.triage.estimateLabel} €{sos.costEUR}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-stone-100">
                        {currentStatus.next && (
                          <button
                            onClick={() => onUpdateSosStatus(sos.id, currentStatus.next!)}
                            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                          >
                            <span>{currentStatus.nextLabel}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <div className="w-48">
                          <CustomSelect
                            value={sos.status}
                            options={sosSelectOptions}
                            onChange={val => onUpdateSosStatus(sos.id, val as SosStatus)}
                          />
                        </div>

                        <a
                          href={`https://wa.me/201000000000?text=${encodeURIComponent(
                            lang === 'en'
                              ? `AURA Emergency Dental Triage. ${sos.clientName}, our duty physician and chauffeur have been dispatched.`
                              : `Экстренная помощь AURA. ${sos.clientName}, наш дежурный врач и водитель уже занимаются вашей заявкой.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                          <Send className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {activeStream === 'bookings' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1 text-xs font-mono text-stone-500">
            <span>{t.admin.triage.bookingsQueueTitle}</span>
            <span>{t.admin.triage.bookingsQueueSub}</span>
          </div>

          <div className="space-y-3">
            {bookingList
              .filter(b => b.clientName.toLowerCase().includes(search.toLowerCase()) || b.hotel.toLowerCase().includes(search.toLowerCase()))
              .map(booking => {
                const currentStatus = bookingStatusMap[booking.status];

                return (
                  <div
                    key={booking.id}
                    className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm transition-all space-y-4"
                  >
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-xl">{booking.countryFlag}</span>
                          <h4 className="text-base font-bold text-stone-950 font-serif">{booking.clientName}</h4>
                          <span className="text-xs font-mono text-stone-400">• {t.admin.triage.bookedAt} {booking.createdAt}</span>

                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border uppercase tracking-wider ${currentStatus.color}`}>
                            {currentStatus.label}
                          </span>
                        </div>

                        <p className="text-xs text-stone-800">
                          {t.admin.triage.programLabel} <strong className="text-stone-950">{booking.procedureTitle}</strong> ({booking.unitsCount} {t.admin.deck.unitsSuffix})
                        </p>

                        <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-stone-600 pt-1">
                          <span className="flex items-center gap-1.5 font-semibold text-stone-900">
                            <Car className="w-3.5 h-3.5 text-[#B89369]" /> {booking.hotel}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-stone-400" /> 
                            {t.admin.triage.datesLabel} {booking.checkInDate} — {booking.checkOutDate}
                          </span>

                          <span className="text-stone-800 font-semibold">
                            {t.admin.triage.totalLabel} €{booking.totalEUR.toLocaleString()} ({t.admin.triage.depositLabel} €{booking.depositEUR})
                          </span>

                          {booking.labTechnician && (
                            <span className="text-stone-500">
                              {t.admin.triage.labMasterLabel} <strong className="text-stone-800">{booking.labTechnician}</strong>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-stone-100">
                        {currentStatus.next && (
                          <button
                            onClick={() => onUpdateBookingStatus(booking.id, currentStatus.next!)}
                            className="px-4 py-2.5 bg-stone-900 hover:bg-[#B89369] text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                          >
                            <span>{currentStatus.nextLabel}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <div className="w-52">
                          <CustomSelect
                            value={booking.status}
                            options={bookingSelectOptions}
                            onChange={val => onUpdateBookingStatus(booking.id, val as BookingStatus)}
                          />
                        </div>

                        <a
                          href={`https://wa.me/201000000000?text=${encodeURIComponent(
                            lang === 'en'
                              ? `Hello ${booking.clientName}! Clinical update from AURA Dental: current stage is "${currentStatus.label}".`
                              : `Здравствуйте, ${booking.clientName}! Информируем по статусу вашего лечения в AURA Dental: этап «${currentStatus.label}».`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                          <Send className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100">
                      <div className="grid grid-cols-6 gap-1.5 text-[10px] font-mono text-center">
                        {[
                          { key: 'plan_negotiation', name: t.admin.triage.steps.inquiry },
                          { key: 'plan_deposit', name: t.admin.triage.steps.deposit },
                          { key: 'plan_scanned', name: t.admin.triage.steps.scan },
                          { key: 'plan_lab', name: t.admin.triage.steps.lab },
                          { key: 'plan_bonding', name: t.admin.triage.steps.bonding },
                          { key: 'plan_completed', name: t.admin.triage.steps.passport }
                        ].map((step, idx) => {
                          const order = ['plan_negotiation', 'plan_deposit', 'plan_scanned', 'plan_lab', 'plan_bonding', 'plan_completed'];
                          const currentIdx = order.indexOf(booking.status);
                          const isPastOrCurrent = currentIdx >= idx;

                          return (
                            <div 
                              key={step.key} 
                              className={`py-1.5 px-1 rounded-lg border transition-all ${
                                isPastOrCurrent 
                                  ? 'bg-stone-900 text-white font-bold border-stone-900' 
                                  : 'bg-stone-50 text-stone-400 border-stone-200'
                              }`}
                            >
                              {step.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};