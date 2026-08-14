import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Stethoscope, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Video, 
  Award, 
  CheckCircle2, 
  Send
} from 'lucide-react';
import { Appointment, ClinicSettings } from '../types';
import { PunjabGovLogo } from './PunjabGovLogo';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: (appointment: Appointment) => void;
  clinicSettings: ClinicSettings;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  onBookAppointment,
  clinicSettings,
}) => {
  if (!isOpen) return null;

  const [consultationType, setConsultationType] = useState<'online_video' | 'clinic_walkin' | 'saturday_governor_house'>('online_video');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState<string>('35');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(clinicSettings.city || 'Lahore');
  const [problemCategory, setProblemCategory] = useState('Sugar / Diabetes');
  const [symptomsDescription, setSymptomsDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-08-16');
  const [selectedTime, setSelectedTime] = useState('12:00 PM - 12:30 PM');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);

  const fee = consultationType === 'saturday_governor_house' ? 0 : clinicSettings.consultationFee;

  const timeSlots = consultationType === 'saturday_governor_house'
    ? ['02:00 PM - 02:30 PM', '02:30 PM - 03:00 PM', '03:00 PM - 03:30 PM', '03:30 PM - 04:00 PM']
    : [
        '11:30 AM - 12:00 PM',
        '12:00 PM - 12:30 PM',
        '01:00 PM - 01:30 PM',
        '05:00 PM - 05:30 PM',
        '06:00 PM - 06:30 PM',
        '07:00 PM - 07:30 PM',
      ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim()) {
      alert('Please provide your name and WhatsApp phone number.');
      return;
    }

    const newApt: Appointment = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: selectedDate,
      timeSlot: selectedTime,
      patientName,
      patientAge: parseInt(patientAge) || 30,
      gender,
      phone,
      city,
      consultationType,
      problemCategory,
      symptomsDescription,
      fee,
      paymentStatus: consultationType === 'saturday_governor_house' 
        ? 'Free (Governor House OPD)' 
        : (consultationType === 'online_video' ? 'Paid Online' : 'Pay at Clinic'),
      status: 'Confirmed',
      createdAt: new Date().toLocaleString()
    };

    onBookAppointment(newApt);
    setBookedAppointment(newApt);
    setIsSuccess(true);
  };

  const handleWhatsAppRedirect = () => {
    if (!bookedAppointment) return;
    const msg = `*Appointment Booking Confirmation - ${clinicSettings.clinicName}*%0A%0A` +
      `*Appt ID:* ${bookedAppointment.id}%0A` +
      `*Doctor:* ${clinicSettings.name} (${clinicSettings.qualifications}, Reg #${clinicSettings.councilRegNo})%0A` +
      `*Patient:* ${bookedAppointment.patientName} (${bookedAppointment.patientAge} Yrs, ${bookedAppointment.gender})%0A` +
      `*Phone:* ${bookedAppointment.phone}%0A` +
      `*City:* ${bookedAppointment.city}%0A` +
      `*Consultation Mode:* ${bookedAppointment.consultationType.replace('_', ' ').toUpperCase()}%0A` +
      `*Date & Time:* ${bookedAppointment.date} at ${bookedAppointment.timeSlot}%0A` +
      `*Condition:* ${bookedAppointment.problemCategory}%0A` +
      `*Fee:* ${bookedAppointment.fee === 0 ? 'FREE (Governor House OPD)' : `PKR ${bookedAppointment.fee}`}%0A` +
      `*Symptoms Summary:* ${bookedAppointment.symptomsDescription || 'Detailed during call'}`;

    window.open(`https://wa.me/${clinicSettings.whatsapp.replace(/\D/g, '')}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                <Stethoscope className="w-4 h-4 text-emerald-600" />
                <span>{clinicSettings.clinicName} Booking Wizard</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-slate-900">
                Book Consultation with {clinicSettings.name}
              </h2>
              <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                <PunjabGovLogo size="xs" />
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {clinicSettings.qualifications} • Reg. No. {clinicSettings.councilRegNo} • <strong className="text-amber-800">{clinicSettings.title}</strong>
                </p>
              </div>
            </div>

            {/* Consultation Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Select Consultation Type:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* 1. Online Video */}
                <button
                  type="button"
                  onClick={() => setConsultationType('online_video')}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                    consultationType === 'online_video'
                      ? 'border-emerald-700 bg-emerald-50/70 ring-2 ring-emerald-700/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <Video className="w-5 h-5 text-emerald-700 mb-1.5" />
                  <div className="text-xs font-bold text-slate-900">Online Video Call</div>
                  <div className="text-[11px] text-slate-500">WhatsApp / Zoom</div>
                  <div className="text-xs font-extrabold text-emerald-800 mt-2">PKR {clinicSettings.consultationFee.toLocaleString()}</div>
                </button>

                {/* 2. Clinic Walkin */}
                <button
                  type="button"
                  onClick={() => setConsultationType('clinic_walkin')}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                    consultationType === 'clinic_walkin'
                      ? 'border-emerald-700 bg-emerald-50/70 ring-2 ring-emerald-700/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <MapPin className="w-5 h-5 text-emerald-700 mb-1.5" />
                  <div className="text-xs font-bold text-slate-900">Clinic Visit</div>
                  <div className="text-[11px] text-slate-500">{clinicSettings.city || 'Garhi Shahu, Lahore'}</div>
                  <div className="text-xs font-extrabold text-emerald-800 mt-2">PKR {clinicSettings.consultationFee.toLocaleString()}</div>
                </button>

                {/* 3. Saturday Governor House Free */}
                <button
                  type="button"
                  onClick={() => setConsultationType('saturday_governor_house')}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                    consultationType === 'saturday_governor_house'
                      ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-600/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <PunjabGovLogo size="sm" />
                    <span className="text-[9px] font-black bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">GOVT</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">Governor House</div>
                  <div className="text-[11px] text-slate-500">Saturday 2pm - 4pm</div>
                  <div className="text-xs font-extrabold text-amber-800 mt-2">FREE OPD</div>
                </button>

              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Muhammad Usman"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Age, Gender & City */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Age (Yrs)
                  </label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-2.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Lahore"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Problem Category */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Primary Medical Complaint
                </label>
                <select
                  value={problemCategory}
                  onChange={(e) => setProblemCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-medium"
                >
                  <option value="Sugar / Diabetes">Sugar & Diabetes Mellitus</option>
                  <option value="Blood Pressure & Heart">High Blood Pressure / Hypertension</option>
                  <option value="Digestive & Acidity">Digestive, Gas, Acidity & Liver Issues</option>
                  <option value="Fertility (Female - PCOS/Infertility)">Female Infertility, PCOS & Hormonal Balance</option>
                  <option value="Fertility (Male - Low Count/Motility)">Male Infertility, Low Count & Vitality</option>
                  <option value="Kidney Stones & Renal">Kidney Stone & Urinary Burning</option>
                  <option value="Joint Pain & Arthritis">Joint Pain, Sciatica & Rheumatism</option>
                  <option value="Skin & Complexion">Acne, Melasma / Chhaiyan & Skin Glow</option>
                  <option value="General Health / Chronic Complex">Other Chronic or Complicated Issue</option>
                </select>
              </div>

              {/* Symptoms notes */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Describe Symptoms / Case History (Optional)
                </label>
                <textarea
                  rows={2}
                  value={symptomsDescription}
                  onChange={(e) => setSymptomsDescription(e.target.value)}
                  placeholder="e.g. Fasting sugar 180, weakness in legs since 2 years, previous medicines not helping..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Available Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 font-medium"
                  >
                    {timeSlots.map((slot, idx) => (
                      <option key={idx} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fee & Submit */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 block">Total Consultation Fee:</span>
                  <span className="text-xl font-extrabold text-emerald-950">
                    {fee === 0 ? 'FREE OF COST' : `PKR ${fee.toLocaleString()}`}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98"
                >
                  Confirm & Generate Appointment Token
                </button>
              </div>

            </form>

          </div>
        ) : (
          /* Booking Success Screen */
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Appointment Token #{bookedAppointment?.id}
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900 mt-2">
                Consultation Successfully Scheduled!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Your consultation token with <strong>Dr. Ejaz Ahmad</strong> has been registered at Punjab Homeopathic Clinic.
              </p>
            </div>

            {/* Token Summary Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-left space-y-2 max-w-md mx-auto">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-900">{bookedAppointment?.patientName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-bold text-slate-900">{bookedAppointment?.date} ({bookedAppointment?.timeSlot})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Consultation Mode:</span>
                <span className="font-bold text-emerald-800 uppercase">{bookedAppointment?.consultationType.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Clinic Location:</span>
                <span className="font-medium text-slate-700">10 Shalimar Road, Garhi Shahu, Lahore</span>
              </div>
              <div className="flex justify-between py-1 font-bold">
                <span className="text-slate-900">Consultation Fee:</span>
                <span className="text-emerald-800 text-sm">
                  {bookedAppointment?.fee === 0 ? 'FREE' : `PKR ${bookedAppointment?.fee}`}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Details on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-colors"
              >
                Done
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
