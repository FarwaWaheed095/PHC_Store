import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Calendar, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Stethoscope, 
  HeartHandshake, 
  Menu, 
  X, 
  Settings, 
  Sparkles, 
  Search, 
  FileText,
  Lock,
  Key
} from 'lucide-react';
import { ClinicSettings } from '../types';
import { PunjabGovLogo } from './PunjabGovLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  openConsultationModal: () => void;
  openAdminModal: () => void;
  openPrescriptionModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clinicSettings: ClinicSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openConsultationModal,
  openAdminModal,
  openPrescriptionModal,
  searchQuery,
  setSearchQuery,
  clinicSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToStoreAndFocus = () => {
    setActiveTab('store');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const searchSection = document.getElementById('store-search-filter-section') || document.getElementById('store-section');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      const searchInput = document.getElementById('store-remedies-search-input') as HTMLInputElement | null;
      if (searchInput) {
        searchInput.focus({ preventScroll: true });
        searchInput.select?.();
      }
    }, 100);
  };

  const handleNavClick = (tab: string) => {
    if (tab === 'store') {
      scrollToStoreAndFocus();
      return;
    }
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Announcement Bar with Book Appointment & Quick Info */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              <PunjabGovLogo size="xs" /> Governor House Service
            </span>
            <span className="text-xs text-emerald-100/90 font-medium">
              {clinicSettings.announcementText || `Free Saturday Checkups (2 PM – 4 PM) with Dr. Ejaz Ahmad`}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs flex-wrap justify-center">
            <a 
              href={`tel:${clinicSettings.phone}`} 
              className="flex items-center gap-1 text-emerald-200 hover:text-amber-300 transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{clinicSettings.phone}</span>
            </a>
            <span className="text-emerald-800 hidden sm:inline">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-300/80 text-xs">
              <MapPin className="w-3 h-3 text-emerald-400" /> {clinicSettings.city || 'Garhi Shahu, Lahore'}
            </span>
            <button
              id="topbar-book-appointment-btn"
              onClick={openConsultationModal}
              className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] shadow-xs transition-all active:scale-95 ml-1"
            >
              <Calendar className="w-3 h-3 text-slate-950" />
              <span>Book Appointment (Rs {clinicSettings.consultationFee.toLocaleString()})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Logo & Clinic Branding */}
          <button 
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-700 to-emerald-950 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
              {clinicSettings.logoUrl ? (
                <img src={clinicSettings.logoUrl} alt={clinicSettings.brandName} className="w-full h-full object-contain" />
              ) : (
                <>
                  <span className="font-serif text-xl font-bold text-amber-300">P</span>
                  <span className="font-serif text-[10px] font-semibold text-emerald-200 -ml-0.5">HC</span>
                </>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg sm:text-xl font-bold text-emerald-950 tracking-tight">
                  {clinicSettings.brandName || 'Punjab Homeopathic'}
                </span>
                <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded">
                  ESTD 1991
                </span>
              </div>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <span className="font-medium text-slate-700">{clinicSettings.name}</span>
                <span className="text-slate-300">•</span>
                <span className="text-amber-700 font-semibold">{clinicSettings.qualifications}</span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-emerald-700 font-medium hidden sm:inline">Reg #{clinicSettings.councilRegNo}</span>
              </p>
            </div>
          </button>

          {/* Compact Modern Search Bar */}
          <div className="hidden xl:flex items-center relative max-w-[220px] w-full">
            <div className="relative w-full flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <input
                id="navbar-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'store') {
                    setActiveTab('store');
                  }
                }}
                placeholder="Search remedies..."
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-slate-900 placeholder:text-slate-400 border border-slate-200/90 rounded-full focus:outline-hidden focus:ring-1.5 focus:ring-emerald-600 focus:border-emerald-600 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-slate-400 hover:text-slate-600 focus:outline-hidden"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links (Home to Why Homeopathy - Single line clean compact) */}
          <nav className="hidden md:flex items-center gap-0.5 sm:gap-1 text-xs whitespace-nowrap">
            <button
              id="nav-tab-home"
              onClick={() => handleNavClick('home')}
              className={`px-2 py-1.5 rounded-md font-medium text-xs transition-colors whitespace-nowrap ${
                activeTab === 'home' 
                  ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              id="nav-tab-store"
              onClick={() => handleNavClick('store')}
              className={`px-2 py-1.5 rounded-md font-medium text-xs transition-colors whitespace-nowrap ${
                activeTab === 'store' 
                  ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              Online Store
            </button>

            <button
              id="nav-tab-fertility"
              onClick={() => handleNavClick('fertility')}
              className={`px-2 py-1.5 rounded-md font-medium text-xs transition-colors flex items-center gap-1 whitespace-nowrap ${
                activeTab === 'fertility' 
                  ? 'bg-rose-50 text-rose-800 font-semibold' 
                  : 'text-slate-600 hover:text-rose-700 hover:bg-rose-50/50'
              }`}
            >
              <Sparkles className="w-3 h-3 text-rose-500" />
              <span>Fertility</span>
            </button>

            <button
              id="nav-tab-doctor"
              onClick={() => handleNavClick('about')}
              className={`px-2 py-1.5 rounded-md font-medium text-xs transition-colors whitespace-nowrap ${
                activeTab === 'about' 
                  ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              Dr. Ejaz Profile
            </button>

            <button
              id="nav-tab-why"
              onClick={() => handleNavClick('why-homeopathy')}
              className={`px-2 py-1.5 rounded-md font-medium text-xs transition-colors whitespace-nowrap ${
                activeTab === 'why-homeopathy' 
                  ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              Why Homeopathy
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Upload Prescription Button */}
            <button
              id="nav-upload-rx-btn"
              onClick={openPrescriptionModal}
              title="Upload Doctor's Prescription for Custom Medicine"
              className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>Upload Rx</span>
            </button>

            {/* Book Consultation Button (Main) */}
            <button
              id="nav-book-consult-btn"
              onClick={openConsultationModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 rounded-lg shadow-xs hover:shadow-sm transition-all active:scale-98 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={openCart}
              className="relative p-2 text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-emerald-50 rounded-lg transition-colors focus:outline-hidden"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5 text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Doctor / Admin Portal Button */}
            <button
              id="nav-admin-portal-btn"
              onClick={openAdminModal}
              title="Doctor Management Portal"
              className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Settings className="w-4.5 h-4.5" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              id="mobile-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'store') {
                  setActiveTab('store');
                }
              }}
              placeholder="Search Sugar, BP, Digestion, Fertility remedies..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 flex flex-col gap-1 pb-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === 'home' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700'
              }`}
            >
              Home & Clinic Overview
            </button>
            <button
              onClick={() => handleNavClick('store')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === 'store' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700'
              }`}
            >
              Online Homeopathic Store (All Medicines)
            </button>
            <button
              onClick={() => handleNavClick('fertility')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                activeTab === 'fertility' ? 'bg-rose-50 text-rose-800 font-bold' : 'text-slate-700'
              }`}
            >
              <span>Fertility & Conception Clinic</span>
              <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-semibold">Special Packages</span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === 'about' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700'
              }`}
            >
              Dr. Ejaz Ahmad Bio & Credentials
            </button>
            <button
              onClick={() => handleNavClick('why-homeopathy')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === 'why-homeopathy' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700'
              }`}
            >
              Why Homeopathy (100% Zero Side Effects)
            </button>

            <div className="pt-2 mt-2 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openPrescriptionModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-50 text-emerald-800 font-semibold text-sm border border-emerald-200"
              >
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>Upload Doctor's Prescription</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openConsultationModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-700 text-white font-bold text-sm shadow-xs"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Book Consultation (Rs {clinicSettings.consultationFee.toLocaleString()})</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdminModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-900 text-amber-300 font-bold text-xs shadow-xs border border-slate-800"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Doctor & Admin Portal Login (ایڈمن لاگ ان)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
