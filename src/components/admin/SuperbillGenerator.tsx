import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Printer, ShieldCheck } from 'lucide-react';

export const SuperbillGenerator: React.FC = () => {
  const { t, lang } = useLanguage();

  const [procedures] = useState([
    { code: 'ADA D2962', desc: 'Labial Veneer (Porcelain Laminate) - Lab E-Max Press', tooth: '11, 21', cost: 540 },
    { code: 'ADA D6010', desc: 'Surgical Placement of Implant Body: Straumann Roxolid', tooth: '16', cost: 620 },
    { code: 'GOZ 9010', desc: 'Implantatbezogene Analyse und 3D Bohrschablonen', tooth: '16', cost: 120 }
  ]);

  const total = procedures.reduce((acc, curr) => acc + curr.cost, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-6 font-sans shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-stone-200">
        <div>
          <h3 className="text-sm font-bold text-stone-900">{t.admin.superbill.title}</h3>
          <p className="text-xs text-stone-500 font-mono mt-0.5">{t.admin.superbill.subtitle}</p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono font-medium rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" /> {t.admin.superbill.printBtn}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#FAF7F2] text-stone-500 border-b border-stone-200">
            <tr>
              <th className="p-3">{t.admin.superbill.colCode}</th>
              <th className="p-3">{t.admin.superbill.colDesc}</th>
              <th className="p-3">{t.admin.superbill.colTooth}</th>
              <th className="p-3 text-right">{t.admin.superbill.colCost}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-stone-800">
            {procedures.map((p, idx) => (
              <tr key={idx}>
                <td className="p-3 font-bold text-[#B89369]">{p.code}</td>
                <td className="p-3">{p.desc}</td>
                <td className="p-3">{p.tooth}</td>
                <td className="p-3 text-right font-bold">€{p.cost}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-stone-300 font-bold text-stone-900">
              <td colSpan={3} className="p-3 text-right">{t.admin.superbill.totalLabel}</td>
              <td className="p-3 text-right text-sm">€{total}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-950 flex items-center justify-between">
        <div>
          <span className="font-bold uppercase block">{t.admin.superbill.fitToFlyTitle}</span>
          <span className="text-[11px] text-emerald-800 font-sans mt-0.5 block">
            {t.admin.superbill.fitToFlyDesc}
          </span>
        </div>
        <span className="px-3 py-1 bg-emerald-700 text-white font-bold rounded-lg text-[10px] tracking-wider">
          {t.admin.superbill.clearanceGranted}
        </span>
      </div>
    </div>
  );
};