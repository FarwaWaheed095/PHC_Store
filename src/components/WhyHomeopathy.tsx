import React from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  HeartHandshake, 
  Sparkles, 
  FlaskConical, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Stethoscope
} from 'lucide-react';

interface WhyHomeopathyProps {
  openConsultationModal: () => void;
  goToStore: () => void;
}

export const WhyHomeopathy: React.FC<WhyHomeopathyProps> = ({ openConsultationModal, goToStore }) => {
  const pillars = [
    {
      title: '100% Zero Side Effects',
      urduTitle: 'سائیڈ ایفیکٹ سے مکمل پاک',
      desc: 'Unlike harsh chemical allopathic drugs that overload the liver, stomach lining, and kidneys, homeopathic micro-potencies work in synergy with the vital force without toxic residual accumulation.',
      icon: ShieldCheck,
      color: 'emerald'
    },
    {
      title: 'Treats the Root Cause Permanently',
      urduTitle: 'بیماری کی جڑ کا مکمل خاتمہ',
      desc: 'Homeopathy does not merely suppress surface symptoms like pain or glucose readings temporarily; it rectifies underlying hormonal imbalances, pancreatic exhaustion, and vascular spasm.',
      icon: Leaf,
      color: 'amber'
    },
    {
      title: 'Custom Clinical Compounding',
      urduTitle: 'ڈاکٹر کے نسخے کے مطابق کلینک میں تیاری',
      desc: 'At Punjab Homeopathic Clinic, medicines are individually compounded and potentized by Dr. Ejaz Ahmad according to your exact physical and mental constitutional symptom profile.',
      icon: FlaskConical,
      color: 'emerald'
    },
    {
      title: 'Safe for All Ages & Conditions',
      urduTitle: 'بچوں اور بزرگوں کے لیے مکمل محفوظ',
      desc: 'Safe for delicate infants, pregnant mothers, diabetic seniors, and cardiac patients. Non-addictive, gentle, and compatible with essential lifestyle supplements.',
      icon: HeartHandshake,
      color: 'amber'
    },
    {
      title: 'Specialized Chronic Cure Protocols',
      urduTitle: 'شوگر، بی پی، معدہ اور بانجھ پن کے خاص کورسز',
      desc: 'Proven clinical protocols developed across 35+ years for severe Type-2 Sugar, Hypertension, Acid Reflux/Fatty Liver, Kidney Stones, and Male/Female Infertility.',
      icon: Activity,
      color: 'emerald'
    },
    {
      title: 'Standard German & Bio-Chemic Extracts',
      urduTitle: 'اصلی جرمن اور بائیو کیمک فارمولیشن',
      desc: 'We strictly import and dispense pharmaceutical-grade German mother tinctures and pure bio-chemic mineral cell salts that meet international pharmacopoeia standards.',
      icon: Sparkles,
      color: 'amber'
    }
  ];

  return (
    <section className="py-10 sm:py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Holistic Science & Principles
          </span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
            Why Homeopathic Medicine is the Safe Choice
          </h2>
          <p className="font-urdu text-sm sm:text-base text-emerald-800" dir="rtl">
            ہومیوپیتھک طریقہ علاج بے ضرر، قدرتی اور مستقل شفا کا ضامن ہے
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Founded on the natural law of <em>"Similia Similibus Curentur"</em> (Like Cures Like), homeopathy activates the body's natural self-healing immune response without toxic residual accumulation.
          </p>
        </div>

        {/* 6 Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isEmerald = pillar.color === 'emerald';
            return (
              <div 
                key={idx}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:shadow-sm transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isEmerald ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="font-urdu text-[11px] text-emerald-700 font-semibold mt-0.5" dir="rtl">
                      {pillar.urduTitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  <span>Clinically Proven at Punjab Homeopathic Clinic</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clinical Note Callout */}
        <div className="mt-8 bg-emerald-950 rounded-2xl p-5 sm:p-6 text-white shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] uppercase tracking-wider">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Doctor's Clinical Compounding</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Prescription Medicines Formulated to Your Specific Needs
              </h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                While general remedies provide fast relief, severe chronic conditions (like diabetes, high blood pressure, complex fertility concerns, and digestive disorders) benefit most from individualized potency complexes. Following consultation with <strong>Dr. Ejaz Ahmad</strong>, a specialized formulation is compounded at our clinic in Garhi Shahu, Lahore and delivered nationwide.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center">
              <button
                onClick={openConsultationModal}
                className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-xs text-center"
              >
                Book Consultation (Rs 2,000)
              </button>
              <button
                onClick={goToStore}
                className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg border border-emerald-600 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>Browse Store Medicines</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
