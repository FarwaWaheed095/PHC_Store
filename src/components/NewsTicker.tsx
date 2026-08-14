import React from 'react';
import { Sparkles, ShieldCheck, Flame, Radio, Award, Stethoscope } from 'lucide-react';
import { ClinicSettings } from '../types';
import { PunjabGovLogo } from './PunjabGovLogo';

interface NewsTickerProps {
  clinicSettings: ClinicSettings;
  openConsultationModal?: () => void;
  openPrescriptionModal?: () => void;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({
  clinicSettings,
  openConsultationModal,
  openPrescriptionModal,
}) => {
  const tickerTextEnglish = `${clinicSettings.clinicName || 'Punjab Homeopathic Clinic'} — ${clinicSettings.name || 'Dr. Ejaz Ahmad'} (${clinicSettings.qualifications || 'D.H.M.S (Pak)'} • Registration # ${clinicSettings.councilRegNo || '48776'} • ${clinicSettings.experience || '35+ Years of Clinical Excellence'}) • Welcome to the official portal of Punjab Homeopathic Clinic, ${clinicSettings.city || 'Lahore'}. Consult directly with ${clinicSettings.name || 'Dr. Ejaz Ahmad'} or order authentic, Germany-standard homeopathic medicines for Sugar, Blood Pressure, Digestion & Fertility with express doorstep delivery across Pakistan.`;

  const tickerTextUrdu = `35 سالہ تجربہ کار ہومیوپیتھک معالج — بغیر سائیڈ ایفیکٹ شوگر، بلڈ پریشر، معدہ اور بے اولادی کا مکمل علاج • گورنر ہاؤس اعزازی معالج و ہفتہ وار فری او پی ڈی سروس`;

  return (
    <div className="bg-slate-950 text-white border-b border-emerald-900/60 shadow-md relative overflow-hidden z-30 select-none">
      <div className="flex items-center">
        
        {/* News Headline Lead Badge */}
        <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-600 via-rose-700 to-amber-600 text-white font-extrabold text-[11px] sm:text-xs shrink-0 tracking-wider shadow-lg z-20 border-r border-red-500/40 uppercase">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <Radio className="w-3.5 h-3.5 hidden sm:inline" />
          <span className="font-display">HEADLINES</span>
        </div>

        {/* Scrolling News Strip (Marquee) */}
        <div className="overflow-hidden whitespace-nowrap relative flex-1 py-2 bg-gradient-to-r from-slate-950 via-emerald-950/80 to-slate-950">
          <div className="inline-block animate-marquee hover:[animation-play-state:paused] cursor-pointer">
            
            {/* Ticker Item 1 */}
            <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-200 px-6">
              <span className="inline-flex items-center gap-1 bg-amber-400/20 border border-amber-400/50 text-amber-300 font-bold px-2 py-0.5 rounded-full text-[11px]">
                <PunjabGovLogo size="xs" /> {clinicSettings.clinicName}
              </span>
              <strong className="text-amber-300 font-bold">{clinicSettings.name}</strong>
              <span className="text-emerald-300 font-semibold">
                {clinicSettings.qualifications} • Registration # {clinicSettings.councilRegNo} • {clinicSettings.experience}
              </span>
              <span className="text-amber-400">★</span>
              <span className="font-urdu text-amber-200 text-sm font-semibold" dir="rtl">
                {tickerTextUrdu}
              </span>
              <span className="text-emerald-400">◆</span>
              <span className="text-slate-300">
                {tickerTextEnglish}
              </span>
              <span className="text-amber-400">★</span>
            </span>

            {/* Repeated for seamless continuous loop */}
            <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-200 px-6">
              <span className="inline-flex items-center gap-1 bg-amber-400/20 border border-amber-400/50 text-amber-300 font-bold px-2 py-0.5 rounded-full text-[11px]">
                <PunjabGovLogo size="xs" /> {clinicSettings.clinicName}
              </span>
              <strong className="text-amber-300 font-bold">{clinicSettings.name}</strong>
              <span className="text-emerald-300 font-semibold">
                {clinicSettings.qualifications} • Registration # {clinicSettings.councilRegNo} • {clinicSettings.experience}
              </span>
              <span className="text-amber-400">★</span>
              <span className="font-urdu text-amber-200 text-sm font-semibold" dir="rtl">
                {tickerTextUrdu}
              </span>
              <span className="text-emerald-400">◆</span>
              <span className="text-slate-300">
                {tickerTextEnglish}
              </span>
              <span className="text-amber-400">★</span>
            </span>

          </div>
        </div>

        {/* Quick OPD Badge / Action on the right */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-950 border-l border-emerald-800/80 text-xs shrink-0 z-20">
          <button
            onClick={openConsultationModal}
            className="text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Stethoscope className="w-3 h-3 text-amber-400" />
            <span>Consult Doctor (2000/- PKR)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
