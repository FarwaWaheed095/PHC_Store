import React from 'react';
import { 
  Sparkles, 
  Heart, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  ShoppingBag, 
  Calendar, 
  ArrowRight,
  Baby,
  Star,
  Activity
} from 'lucide-react';
import { Product } from '../types';

interface FertilitySectionProps {
  fertilityProducts: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  openConsultationModal: () => void;
}

export const FertilitySection: React.FC<FertilitySectionProps> = ({
  fertilityProducts,
  onAddToCart,
  onQuickView,
  openConsultationModal,
}) => {
  return (
    <section className="py-10 sm:py-12 bg-gradient-to-b from-rose-50/50 via-white to-slate-50 border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-100/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            <Baby className="w-3.5 h-3.5 text-rose-600" />
            <span>Specialized Infertility & Conception Care</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-slate-900">
            Natural Fertility Solutions & Conception Packages
          </h2>

          <p className="font-urdu text-sm sm:text-base text-rose-900 font-semibold" dir="rtl">
            بے اولادی، پی سی او ایس (PCOS)، ہارمونل بگاڑ اور مردانہ کمزوری کا قدرتی اور آزمودہ علاج
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            With 35+ years of clinical specialization, <strong>Dr. Ejaz Ahmad</strong> provides personalized natural protocols for couples to balance hormones, stimulate healthy ovulation, and improve reproductive parameters safely.
          </p>
        </div>

        {/* Why Choose Our Fertility Protocols Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
          
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-rose-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Female Fertility & PCOS Balance
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assists in regulating menstrual cycles, supporting ovarian health, and balancing reproductive hormone levels naturally.
            </p>
            <div className="text-[11px] text-rose-700 font-semibold flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" /> Zero synthetic hormone injections
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-5 border border-rose-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Male Count & Motility Booster
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clinical homeopathic potencies that support healthy sperm parameters and overall physical vitality.
            </p>
            <div className="text-[11px] text-blue-700 font-semibold flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Discreet and confidential packaging
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-5 border border-rose-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Combined Couple Care Plans
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Synchronized 90-day natural treatment programs for both partners with personalized case evaluation and doctor guidance.
            </p>
            <div className="text-[11px] text-amber-700 font-semibold flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Dedicated case follow-up
            </div>
          </div>

        </div>

        {/* Fertility Packages & Medicines Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Featured Fertility Formulations & Packages
              </h3>
              <p className="text-xs text-slate-500">
                Compounded under the direct clinical supervision of Dr. Ejaz Ahmad
              </p>
            </div>

            <button
              onClick={openConsultationModal}
              className="text-xs sm:text-sm font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1"
            >
              <span>Book Fertility Consultation (Rs 2,000)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {fertilityProducts.map((product) => {
              const discountPercent = Math.round(
                ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
              );

              return (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-rose-300 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Image & Badge */}
                    <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] sm:text-[11px] font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-xs">
                          {product.badge}
                        </span>
                      )}
                      <span className="absolute top-2.5 right-2.5 bg-amber-400 text-slate-950 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-md shadow-xs">
                        SAVE {discountPercent}%
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 space-y-2.5 sm:space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="bg-rose-50 text-rose-800 font-bold px-2 py-0.5 rounded text-[11px]">
                          {product.potency}
                        </span>
                        <div className="flex items-center text-amber-500 font-bold gap-1 text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{product.rating}</span>
                          <span className="text-slate-400">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h4 className="text-sm sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-rose-700 transition-colors">
                        {product.name}
                      </h4>

                      <p className="font-urdu text-[11px] sm:text-xs text-rose-900 font-medium" dir="rtl">
                        {product.urduName}
                      </p>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {product.packageDetails && (
                        <div className="bg-rose-50/70 border border-rose-200/60 rounded-xl p-2.5 sm:p-3 text-xs space-y-1 sm:space-y-1.5">
                          <div className="font-bold text-rose-950 flex items-center gap-1.5 text-[11px] sm:text-xs">
                            <Sparkles className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            <span>Duration: {product.packageDetails.duration}</span>
                          </div>
                          <ul className="text-slate-600 space-y-0.5 pl-2 list-disc list-inside text-[11px]">
                            {product.packageDetails.itemsIncluded.slice(0, 2).map((item, idx) => (
                              <li key={idx} className="truncate">{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 mt-2 sm:mt-4 space-y-2.5 sm:space-y-3">
                    <div className="flex items-baseline justify-between pt-2 sm:pt-3">
                      <div>
                        <span className="text-[11px] sm:text-xs text-slate-400 line-through mr-1.5">
                          PKR {product.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-base sm:text-xl font-extrabold text-slate-900">
                          PKR {product.discountedPrice.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        In Stock
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onQuickView(product)}
                        className="py-2 sm:py-2.5 px-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => onAddToCart(product)}
                        className="py-2 sm:py-2.5 px-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Private Consultation CTA */}
        <div className="mt-12 bg-white border border-rose-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-slate-900 font-display">
              Need Confidential Fertility Case Evaluation with Dr. Ejaz Ahmad?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Dr. Ejaz Ahmad provides discreet, personalized one-on-one video consultations (Fee: PKR 2,000) for couples across Pakistan and overseas. Share your ultrasound, hormone profiles (FSH/LH/AMH), and semen analysis for an individualized roadmap.
            </p>
          </div>

          <button
            onClick={openConsultationModal}
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-sm rounded-xl shadow-md shrink-0 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Fertility Slot (Rs 2,000)</span>
          </button>
        </div>

      </div>
    </section>
  );
};
