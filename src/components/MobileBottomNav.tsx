import React from 'react';
import { Home, ShoppingBag, Calendar, Sparkles, MessageSquare } from 'lucide-react';
import { ClinicSettings } from '../types';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  openConsultationModal: () => void;
  clinicSettings?: ClinicSettings;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openConsultationModal,
  clinicSettings,
}) => {
  const whatsappNumber = clinicSettings?.whatsapp || '+92 300 4877600';
  const doctorName = clinicSettings?.name || 'Dr. Ejaz Ahmad';
  const feeLabel = clinicSettings ? `${Math.round(clinicSettings.consultationFee / 1000)}k` : '2k';

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(doctorName)},%20I%20want%20to%20inquire%20about%20Homeopathic%20consultation%20and%20medicines.`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]">
      <div className="grid grid-cols-5 items-center justify-around text-center">
        
        {/* Home Tab */}
        <button
          id="mobile-bot-home"
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'home' ? 'text-emerald-800 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`p-1 rounded-full ${activeTab === 'home' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
            <Home className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
        </button>

        {/* Store Tab */}
        <button
          id="mobile-bot-store"
          onClick={() => {
            setActiveTab('store');
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
          }}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'store' ? 'text-emerald-800 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`p-1 rounded-full ${activeTab === 'store' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
            <ShoppingBag className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Store</span>
        </button>

        {/* Book Appointment (Hero Center Action) */}
        <button
          id="mobile-bot-book"
          onClick={openConsultationModal}
          className="flex flex-col items-center justify-center -mt-4 py-0 transition-transform active:scale-95"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center shadow-lg border-2 border-white">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-amber-900 mt-0.5 tracking-tight">Book ({feeLabel})</span>
        </button>

        {/* Fertility Tab */}
        <button
          id="mobile-bot-fertility"
          onClick={() => {
            setActiveTab('fertility');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'fertility' ? 'text-rose-800 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`p-1 rounded-full ${activeTab === 'fertility' ? 'bg-rose-100 text-rose-800' : ''}`}>
            <Sparkles className="w-4.5 h-4.5 text-rose-600" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Fertility</span>
        </button>

        {/* WhatsApp Doctor */}
        <a
          id="mobile-bot-whatsapp"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-emerald-600 hover:text-emerald-700 active:scale-95"
        >
          <div className="p-1 rounded-full bg-emerald-50 text-emerald-600">
            <MessageSquare className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-semibold">WhatsApp</span>
        </a>

      </div>
    </div>
  );
};
