import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Stethoscope, 
  Truck, 
  ShieldCheck, 
  Phone,
  Sparkles
} from 'lucide-react';
import { DOCTOR_INFO } from '../data/initialData';

interface CustomPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  openConsultationModal: () => void;
}

export const CustomPrescriptionModal: React.FC<CustomPrescriptionModalProps> = ({
  isOpen,
  onClose,
  openConsultationModal,
}) => {
  if (!isOpen) return null;

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [address, setAddress] = useState('');
  const [illnessHistory, setIllnessHistory] = useState('');
  const [previousPrescriptionNo, setPreviousPrescriptionNo] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const generatedRef = `RX-${Math.floor(10000 + Math.random() * 90000)}`;
    setRefId(generatedRef);
    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const msg = `*Custom Clinical Prescription Request - Punjab Homeopathic Clinic*%0A%0A` +
      `*Reference:* ${refId}%0A` +
      `*Patient Name:* ${patientName}%0A` +
      `*Phone:* ${phone}%0A` +
      `*City:* ${city}%0A` +
      `*Delivery Address:* ${address}%0A` +
      `*Previous Rx #:* ${previousPrescriptionNo || 'New Patient'}%0A` +
      `*Case Notes:* ${illnessHistory}%0A` +
      `*Uploaded File:* ${fileName || 'Will send picture via WhatsApp'}`;

    window.open(`https://wa.me/${DOCTOR_INFO.whatsapp.replace(/\D/g, '')}?text=${msg}`, '_blank');
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

        {!submitted ? (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Punjab Homeopathic Clinic Dispensing Service</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-slate-900">
                Order Custom Clinical Formulation
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Compounded specifically per <strong>Dr. Ejaz Ahmad's Prescription</strong> at 10 Shalimar Road, Garhi Shahu, Lahore & delivered to your doorstep.
              </p>
            </div>

            {/* Explanatory Clinical Guarantee Box */}
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Stethoscope className="w-4 h-4" />
                <span>How Clinical Dispensing Works:</span>
              </div>
              <p className="text-emerald-100 leading-relaxed text-[11px]">
                1. Upload your past prescription from Dr. Ejaz Ahmad OR medical lab reports.<br />
                2. Dr. Ejaz Ahmad reviews the symptoms and selects the precise individual homeopathic potencies.<br />
                3. The clinic dispensary prepares the sterile medicine bottle, seals it, and dispatches via courier to your home across Pakistan.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600"
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
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Lahore / Karachi / Islamabad..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Previous Rx / Token No. (If known)
                  </label>
                  <input
                    type="text"
                    value={previousPrescriptionNo}
                    onChange={(e) => setPreviousPrescriptionNo(e.target.value)}
                    placeholder="e.g. APT-1082"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Complete Home Delivery Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House #, Street #, Sector / Area, City"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Medical Notes / Current Symptoms
                </label>
                <textarea
                  rows={2}
                  value={illnessHistory}
                  onChange={(e) => setIllnessHistory(e.target.value)}
                  placeholder="Explain your disease condition, sugar readings, BP values, or fertility treatment notes..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Upload Prescription / Report File */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Upload Prescription Slip / Medical Report (Image / PDF)
                </label>
                <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors">
                  <Upload className="w-6 h-6 text-emerald-700 mb-1" />
                  <span className="text-xs font-bold text-slate-800">
                    {fileName ? fileName : 'Click or Drag to Upload Prescription File'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Supports JPG, PNG, PDF up to 15MB
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openConsultationModal();
                  }}
                  className="text-xs font-semibold text-emerald-800 hover:underline"
                >
                  Haven't consulted yet? Book 2,000 PKR Consultation
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-all"
                >
                  Submit Prescription Request
                </button>
              </div>

            </form>

          </div>
        ) : (
          /* Submission Screen */
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Ref #{refId}
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900 mt-2">
                Prescription Received by Clinic Dispensary
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Dr. Ejaz Ahmad and the clinical pharmacy team will review your case notes and contact you on WhatsApp to confirm formulation & dispatch.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-left space-y-1.5 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-900">{patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="font-medium text-slate-800">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery City:</span>
                <span className="font-medium text-slate-800">{city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Courier:</span>
                <span className="font-bold text-emerald-800">TCS Express Doorstep Courier</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setSubmitted(false);
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
