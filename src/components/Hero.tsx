import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Calendar, 
  ShoppingBag, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  PhoneCall, 
  Clock,
  ArrowRight,
  HeartPulse
} from 'lucide-react';
import { ClinicSettings } from '../types';
import { PunjabGovLogo } from './PunjabGovLogo';

interface HeroProps {
  openConsultationModal: () => void;
  goToStore: () => void;
  goToFertility: () => void;
  openPrescriptionModal: () => void;
  clinicSettings: ClinicSettings;
}

export const Hero: React.FC<HeroProps> = ({
  openConsultationModal,
  goToStore,
  goToFertility,
  openPrescriptionModal,
  clinicSettings,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Decorative Glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-10 sm:pb-14 relative z-10">
        
        {/* Honorary Position Highlight Ribbon with Punjab Govt Logo */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-amber-500/20 border border-amber-400/40 rounded-full pl-2 pr-3.5 py-1 mb-4 text-xs text-amber-200 backdrop-blur-md shadow-xs group">
          <PunjabGovLogo size="xs" showTooltip className="ring-1 ring-amber-400/50" />
          <span className="font-semibold text-amber-300">{clinicSettings.title}</span>
          <span className="text-amber-400/60 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-amber-100">Free Saturday OPD @ Governor House</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading & Credentials */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="space-y-2">
              <div className="text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pure Natural Healing Since 1991</span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white tracking-tight">
                {clinicSettings.clinicName}
                <span className="block text-xl sm:text-2xl lg:text-3xl text-amber-300 font-serif font-bold mt-1">
                  {clinicSettings.name}
                </span>
                <span className="text-xs sm:text-sm font-medium text-emerald-200 block mt-0.5">
                  {clinicSettings.qualifications} • Registration # {clinicSettings.councilRegNo} • {clinicSettings.experience}
                </span>
              </h1>

              <p className="font-urdu text-sm sm:text-base text-emerald-200/90 pt-0.5 leading-relaxed" dir="rtl">
                35 سالہ تجربہ کار ہومیوپیتھک معالج — بغیر سائیڈ ایفیکٹ شوگر، بلڈ پریشر، معدہ اور بے اولادی کا مکمل علاج
              </p>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Welcome to the official portal of <strong>{clinicSettings.clinicName}</strong>, {clinicSettings.city || 'Lahore'}. Consult directly with <strong>{clinicSettings.name}</strong> or order authentic, Germany-standard homeopathic medicines for Sugar, Blood Pressure, Digestion & Fertility with express doorstep delivery across Pakistan.
            </p>

            {/* Credential Badges Grid */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <div className="bg-emerald-900/70 border border-emerald-700/50 rounded-xl p-2.5 sm:p-3 text-center sm:text-left backdrop-blur-xs">
                <div className="text-xl sm:text-2xl font-black text-amber-400">35+</div>
                <div className="text-[11px] sm:text-xs text-slate-300 font-medium leading-tight mt-0.5">Years Experience</div>
              </div>

              <div className="bg-emerald-900/70 border border-emerald-700/50 rounded-xl p-2.5 sm:p-3 text-center sm:text-left backdrop-blur-xs">
                <div className="text-xl sm:text-2xl font-black text-emerald-300">0%</div>
                <div className="text-[11px] sm:text-xs text-slate-300 font-medium leading-tight mt-0.5">Side Effects</div>
              </div>

              <div className="bg-emerald-900/70 border border-emerald-700/50 rounded-xl p-2.5 sm:p-3 text-center sm:text-left backdrop-blur-xs">
                <div className="text-lg sm:text-xl font-bold text-amber-300">#{clinicSettings.councilRegNo}</div>
                <div className="text-[11px] sm:text-xs text-slate-300 font-medium leading-tight mt-0.5">Council Reg. #</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                id="hero-book-btn"
                onClick={openConsultationModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-900/20 hover:scale-[1.01] active:scale-98 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation (PKR {clinicSettings.consultationFee.toLocaleString()})</span>
              </button>

              <button
                id="hero-store-btn"
                onClick={goToStore}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-emerald-800/80 hover:bg-emerald-700 border border-emerald-600/60 text-white font-semibold text-xs sm:text-sm rounded-xl backdrop-blur-xs transition-all hover:scale-[1.01] active:scale-98"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-300" />
                <span>Browse Store</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
              </button>
            </div>

            {/* Quick Micro-links */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-0.5">
              <button 
                onClick={goToFertility}
                className="hover:text-rose-300 flex items-center gap-1 transition-colors underline decoration-rose-500/50"
              >
                <Sparkles className="w-3 h-3 text-rose-400" /> Male & Female Fertility
              </button>
              <span>•</span>
              <button 
                onClick={openPrescriptionModal}
                className="hover:text-amber-300 flex items-center gap-1 transition-colors underline decoration-amber-500/50"
              >
                <HeartPulse className="w-3 h-3 text-amber-400" /> Custom Prescription Compounding
              </button>
            </div>

          </div>

          {/* Right Column: Doctor Feature Profile Card & Quick Clinic Info */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-xl backdrop-blur-md relative overflow-hidden">
              
              {/* Doctor Header & Avatar Badge */}
              <div className="flex items-start gap-3.5 pb-4 border-b border-slate-700/60">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-emerald-600 to-amber-700 p-0.5 shadow-md">
                    <img 
                      src={clinicSettings.doctorImageUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"} 
                      alt={`${clinicSettings.name} - Consultant Homeopathician`}
                      className="w-full h-full object-cover rounded-[10px]"
                    />
                  </div>
                  <span className="absolute -bottom-1.5 -right-1 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded shadow-xs">
                    35 YRS
                  </span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Chief Consultant
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                    {clinicSettings.name}
                  </h2>
                  <p className="text-xs text-emerald-300 font-medium">
                    {clinicSettings.qualifications} • Registration # {clinicSettings.councilRegNo}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {clinicSettings.councilName}
                  </p>
                </div>
              </div>

              {/* Saturday Governor House Highlight Box */}
              <div className="my-3.5 bg-amber-500/10 border border-amber-400/30 rounded-xl p-3 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                  <PunjabGovLogo size="xs" />
                  <span>Free Saturday OPD @ Governor House Lahore</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {clinicSettings.governorHouseSchedule}
                </p>
              </div>

              {/* Clinic Key Details List */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Clinic Address:</strong> {clinicSettings.address}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Clinic Timings:</strong> {clinicSettings.timings}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Delivery:</strong> Nationwide doorstep delivery across Pakistan
                  </div>
                </div>
              </div>

              {/* Quick Action Footer within Card */}
              <div className="mt-4 pt-3.5 border-t border-slate-700/60 flex items-center justify-between gap-2.5">
                <a
                  href={`https://wa.me/${clinicSettings.whatsapp.replace(/\D/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(clinicSettings.name)},%20I%20want%20to%20inquire%20about%20Homeopathic%20treatment%20at%20${encodeURIComponent(clinicSettings.clinicName)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={openConsultationModal}
                  className="flex-1 text-center py-2 px-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-lg text-xs border border-slate-600 transition-colors"
                >
                  <span>Book Slot (Rs {clinicSettings.consultationFee.toLocaleString()})</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Bottom Features Strip */}
      <div className="border-t border-emerald-800/40 bg-emerald-950/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% German Standard Mother Tinctures</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero Side Effects or Chemical Toxins</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Nationwide COD & Express Courier</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Custom Clinic Compounding</span>
          </div>
        </div>
      </div>
    </div>
  );
};
