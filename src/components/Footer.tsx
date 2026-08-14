import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  ExternalLink, 
  ChevronRight,
  Lock,
  Key,
  Shield,
  UserCheck
} from 'lucide-react';
import { ClinicSettings, ProductCategory } from '../types';
import { PunjabGovLogo } from './PunjabGovLogo';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onSelectCategory: (category: ProductCategory) => void;
  openConsultationModal: () => void;
  openPrescriptionModal: () => void;
  openAdminPortal: () => void;
  clinicSettings: ClinicSettings;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onSelectCategory,
  openConsultationModal,
  openPrescriptionModal,
  openAdminPortal,
  clinicSettings,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      
      {/* Top SEO Strip */}
      <div className="bg-emerald-950/90 border-b border-emerald-900/60 py-4 sm:py-5 text-xs text-emerald-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <PunjabGovLogo size="md" showTooltip />
            <div>
              <strong className="text-white block text-xs sm:text-sm">{clinicSettings.title}</strong>
              <span className="text-[11px] text-emerald-200/80">{clinicSettings.governorHouseSchedule} at Governor House Lahore</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong className="text-white block text-xs sm:text-sm">Registered {clinicSettings.qualifications} Homeopathician</strong>
              <span className="text-[11px] text-emerald-200/80">{clinicSettings.councilName} Reg # {clinicSettings.councilRegNo} • {clinicSettings.experience}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <strong className="text-white block text-xs sm:text-sm">{clinicSettings.clinicName} Location</strong>
              <span className="text-[11px] text-emerald-200/80">{clinicSettings.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Doctor Bio */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-amber-600 flex items-center justify-center text-white font-bold text-base font-serif overflow-hidden">
                {clinicSettings.logoUrl ? (
                  <img src={clinicSettings.logoUrl} alt={clinicSettings.brandName} className="w-full h-full object-contain" />
                ) : (
                  <span>P</span>
                )}
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-white">
                  {clinicSettings.brandName || 'Punjab Homeopathic'}
                </h3>
                <p className="text-[11px] text-emerald-400">{clinicSettings.name} Clinic & Store</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Official clinic and e-pharmacy of <strong>{clinicSettings.name}</strong> ({clinicSettings.qualifications}, Reg. No. {clinicSettings.councilRegNo}), Consultant Homeopathician with {clinicSettings.experience}. Providing natural medicines for Sugar, Blood Pressure, Digestive disorders, Kidney stones, and Infertility with delivery across Pakistan.
            </p>

            <div className="pt-1">
              <span className="font-urdu text-xs text-emerald-300 block" dir="rtl">
                {clinicSettings.urduName} — {clinicSettings.address}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Clinic Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Home & Clinic Overview</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('store')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Online Homeopathic Store</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('fertility')}
                  className="hover:text-rose-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-rose-500" />
                  <span>Fertility & Conception Packages</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('why-homeopathy')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Why Homeopathy (Zero Side Effects)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openConsultationModal}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Book Consultation (PKR {clinicSettings.consultationFee.toLocaleString()})</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openPrescriptionModal}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Upload Doctor's Prescription</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Core Categories SEO Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Remedy Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectTab('store');
                    onSelectCategory('sugar_diabetes');
                  }}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Sugar & Diabetes Mellitus</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('store');
                    onSelectCategory('blood_pressure');
                  }}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Blood Pressure & Heart Tonic</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('store');
                    onSelectCategory('digestive_liver');
                  }}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Digestive, Gas, Acidity & Liver</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('store');
                    onSelectCategory('fertility_reproductive');
                  }}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Fertility & Reproductive Health</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('store');
                    onSelectCategory('kidney_urinary');
                  }}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Kidney Stone (Berberis Vulgaris)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('store');
                    onSelectCategory('clinical_custom');
                  }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Doctor's Custom Formulations</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Clinic & Governor House Hours
            </h4>

            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{clinicSettings.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${clinicSettings.phone}`} className="hover:text-white font-bold text-emerald-300">
                  {clinicSettings.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{clinicSettings.email}</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1 mt-2">
                <div className="font-bold text-white">Daily Clinic Timings:</div>
                <div className="text-slate-400">{clinicSettings.timings}</div>
                <div className="text-amber-400 font-semibold pt-1">
                  Governor House OPD: {clinicSettings.governorHouseSchedule}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dedicated Admin & Doctor Portal Login Bar (At the bottom of the page) */}
        <div className="mt-12 pt-8 pb-6 border-t border-slate-800/80">
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950/70 to-slate-900 border border-emerald-900/50 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-white font-display">
                    Doctor & Clinic Administration Portal
                  </h4>
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full hidden sm:inline">
                    Staff & Doctor
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage remedies inventory, update clinic timings, check appointments & review custom prescription orders.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                id="footer-admin-login-btn"
                onClick={openAdminPortal}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-emerald-900/50 transition-all active:scale-95 cursor-pointer border border-emerald-500/40"
              >
                <Key className="w-4 h-4 text-amber-300" />
                <span>🔐 Doctor & Admin Login (ایڈمن لاگ ان)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Medical & Legal Disclaimer */}
        <div className="pt-4 border-t border-slate-900 text-[11px] text-slate-500 text-center space-y-2">
          <p>
            <strong>Disclaimer:</strong> Homeopathic medicines are recognized and registered under the {clinicSettings.councilName}. Clinical custom medicines are compounded strictly in accordance with {clinicSettings.name}'s medical consultation and official pharmacopoeia guidelines.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400 pt-1">
            <span>© {new Date().getFullYear()} {clinicSettings.clinicName} • {clinicSettings.name} ({clinicSettings.qualifications}, Reg. # {clinicSettings.councilRegNo}). All Rights Reserved.</span>
            <button
              onClick={openAdminPortal}
              className="text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal Login</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
