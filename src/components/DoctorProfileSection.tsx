import React from 'react';
import { 
  Award, 
  GraduationCap, 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck2,
  Stethoscope,
  Calendar
} from 'lucide-react';
import { ClinicSettings } from '../types';
import { PunjabGovLogo } from './PunjabGovLogo';

interface DoctorProfileSectionProps {
  openConsultationModal: () => void;
  clinicSettings: ClinicSettings;
}

export const DoctorProfileSection: React.FC<DoctorProfileSectionProps> = ({ openConsultationModal, clinicSettings }) => {
  return (
    <section className="py-10 sm:py-12 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Doctor Visual Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
              <div className="relative mb-5">
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-emerald-950/80 border border-amber-400/30">
                  <img 
                    src={clinicSettings.doctorImageUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"} 
                    alt={`${clinicSettings.name} - Consultant Homeopathician`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -bottom-2.5 right-3 bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                  <Award className="w-3 h-3" /> {clinicSettings.experience}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    {clinicSettings.name}
                  </h3>
                  <p className="font-urdu text-base text-emerald-300 font-semibold" dir="rtl">
                    {clinicSettings.urduName}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 bg-amber-500/10 border border-amber-400/30 rounded-lg px-2 py-1">
                    <PunjabGovLogo size="xs" />
                    <p className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                      {clinicSettings.title}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-200 pt-2 border-t border-slate-700">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>Degree:</strong> {clinicSettings.qualifications}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>Reg No:</strong> {clinicSettings.councilRegNo} ({clinicSettings.councilName})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>Clinic:</strong> {clinicSettings.clinicName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{clinicSettings.address}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={openConsultationModal}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Consultation (PKR {clinicSettings.consultationFee.toLocaleString()})</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Doctor Bio & Detailed Credentials */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Official Clinical Profile
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-1.5">
                {clinicSettings.name} — Senior Consultant Homeopathician
              </h2>
              <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                {clinicSettings.qualifications} • Medical Practitioner Registration No. {clinicSettings.councilRegNo} • {clinicSettings.experience}
              </p>
            </div>

            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-2.5">
              <p>
                <strong>{clinicSettings.name}</strong> is one of the most respected and senior Homeopathic physicians in Punjab, having dedicated over <strong>35 years</strong> to the clinical practice of pure, side-effect-free homeopathic science.
              </p>
              <p>
                Holding a formal <strong>{clinicSettings.qualifications}</strong> and legally registered under <strong>Practitioner Reg. No. {clinicSettings.councilRegNo}</strong> with the <strong>{clinicSettings.councilName}</strong>, {clinicSettings.name} combines classical homeopathic principles with modern diagnostic evaluation.
              </p>
              <p>
                In recognition of his exemplary medical service, {clinicSettings.name} was appointed as the <strong>{clinicSettings.title}</strong>. He holds a free public health camp at <strong>Governor House Lahore every Saturday from 2:00 PM to 4:00 PM</strong>.
              </p>
              <p>
                At his main private clinic at <strong>{clinicSettings.address}</strong>, Dr. Ejaz treats chronic ailments including <em>Sugar (Diabetes), Blood Pressure, Gastric & Liver issues, Kidney Stones, and Infertility</em>.
              </p>
            </div>

            {/* Qualifications & Specialities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Clinical Competencies</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-3.5">
                  <li>Individualized Constitutional Treatment</li>
                  <li>Type-1 & Type-2 Sugar Natural Care</li>
                  <li>Blood Pressure & Vascular Support</li>
                  <li>Male / Female Infertility Solutions</li>
                  <li>Acidity, Gastritis & Fatty Liver Care</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Clinic & OPD Timings</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1.5">
                  <p>
                    <strong className="text-slate-800">{clinicSettings.clinicName}:</strong><br />
                    {clinicSettings.timings}
                  </p>
                  <p className="bg-amber-100/70 p-1.5 rounded text-amber-950 font-medium text-[11px]">
                    <strong className="text-amber-900">Governor House:</strong> {clinicSettings.governorHouseSchedule}
                  </p>
                </div>
              </div>
            </div>

            {/* Consultation Fee Callout */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Private Consultation Fee
                </span>
                <div className="text-lg font-bold text-emerald-950">
                  PKR {clinicSettings.consultationFee.toLocaleString()} <span className="text-xs text-slate-500 font-normal">(Clinic Walk-in / Phone Consultation)</span>
                </div>
              </div>

              <button
                onClick={openConsultationModal}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors shrink-0 shadow-xs"
              >
                Schedule with {clinicSettings.name}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
