import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Activity, CheckCircle2 } from 'lucide-react';
import { SYMPTOM_CHECKER_DATA } from '../data/initialData';
import { ProductCategory } from '../types';

interface SymptomAdvisorProps {
  onSelectCategory: (category: ProductCategory) => void;
  openConsultationModal: () => void;
}

export const SymptomAdvisor: React.FC<SymptomAdvisorProps> = ({
  onSelectCategory,
  openConsultationModal,
}) => {
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>(SYMPTOM_CHECKER_DATA[0].id);

  const currentMatch = SYMPTOM_CHECKER_DATA.find((s) => s.id === selectedSymptomId) || SYMPTOM_CHECKER_DATA[0];

  return (
    <section className="py-10 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-1.5">
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Health & Remedy Finder</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            What Health Concern Are You Experiencing?
          </h2>
          <p className="text-xs text-slate-500">
            Select your symptom below to view Dr. Ejaz Ahmad's clinically indicated homeopathic solution.
          </p>
        </div>

        {/* Symptoms Selector Pills */}
        <div className="flex flex-wrap justify-center gap-1.5 max-w-4xl mx-auto mb-6">
          {SYMPTOM_CHECKER_DATA.map((item) => {
            const isSelected = item.id === selectedSymptomId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedSymptomId(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {item.symptom.split('/')[0]}
              </button>
            );
          })}
        </div>

        {/* Result Match Box */}
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/70 rounded-2xl p-5 sm:p-6 border border-emerald-200/80 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            
            <div className="md:col-span-8 space-y-2.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dr. Ejaz Ahmad's Clinical Recommendation</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                {currentMatch.symptom}
              </h3>

              <p className="font-urdu text-xs sm:text-sm text-emerald-900 font-semibold" dir="rtl">
                {currentMatch.urduSymptom}
              </p>

              <div className="bg-white/90 border border-emerald-100 rounded-lg p-2.5 space-y-0.5">
                <div className="text-[11px] text-slate-500 font-medium">Recommended Remedy / Protocol:</div>
                <div className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{currentMatch.primaryMedicine}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {currentMatch.advice}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-2 justify-center">
              <button
                onClick={() => onSelectCategory(currentMatch.suggestedCategory as ProductCategory)}
                className="w-full py-2.5 px-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>{currentMatch.action}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={openConsultationModal}
                className="w-full py-2 px-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs rounded-lg border border-slate-300 transition-all text-center"
              >
                Consult Dr. Ejaz (2k PKR)
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
