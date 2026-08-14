import React from 'react';
import { Award, Clock, MapPin, Calendar, HeartHandshake, CheckCircle } from 'lucide-react';
import { ClinicSettings } from '../types';
import { PunjabGovLogo } from './PunjabGovLogo';

interface GovernorHouseBannerProps {
  openConsultationModal: () => void;
  clinicSettings?: ClinicSettings;
}

export const GovernorHouseBanner: React.FC<GovernorHouseBannerProps> = ({ openConsultationModal, clinicSettings }) => {
  const doctorName = clinicSettings?.name || 'Dr. Ejaz Ahmad';
  const schedule = clinicSettings?.governorHouseSchedule || 'Every Saturday 2:00 PM – 4:00 PM';
  const clinicName = clinicSettings?.clinicName || 'Punjab Homeopathic Clinic';
  const title = clinicSettings?.title || 'Honorary Physician to the Governor of Punjab';

  return (
    <section className="py-7 bg-gradient-to-r from-amber-50/80 via-emerald-50/60 to-amber-50/80 border-y border-amber-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-200 shadow-xs relative overflow-hidden">
          
          {/* Background Emblem Watermark */}
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-amber-500/5 rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Seal & Heading */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-300/80 text-amber-900 flex items-center justify-center shrink-0 shadow-xs">
                  <PunjabGovLogo size="md" showTooltip />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                    Government of Punjab • Public Welfare Mission
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                      {title}
                    </h2>
                    <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md border border-emerald-300">
                      Govt. of Punjab Official
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                As part of his public service, <strong>{doctorName}</strong> sits at <strong>Governor House Lahore</strong> ({schedule}), conducting free homeopathic health checkups for the public.
              </p>

              <div className="flex flex-wrap gap-2.5 text-xs text-slate-800 pt-0.5">
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Saturday: 2:00 PM – 4:00 PM</span>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg font-medium text-emerald-950">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Governor House, Lahore</span>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg font-semibold text-slate-800">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Free Public OPD</span>
                </div>
              </div>
            </div>

            {/* Action Box */}
            <div className="lg:col-span-4 bg-emerald-950 text-white rounded-xl p-4 sm:p-5 text-center space-y-2.5 shadow-xs">
              <HeartHandshake className="w-7 h-7 text-amber-400 mx-auto" />
              <div className="text-xs sm:text-sm font-bold text-emerald-100">
                Attend Governor House Saturday OPD or Clinic
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Register for Governor House OPD or schedule an appointment at {clinicName}.
              </p>
              <button
                id="governor-house-register-btn"
                onClick={openConsultationModal}
                className="w-full py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-xs"
              >
                Register for OPD / Book Clinic Slot
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
