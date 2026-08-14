import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  SlidersHorizontal,
  X,
  Calendar,
  Award,
  Stethoscope,
  CheckCircle2,
  Video,
  Phone,
  Copy,
  Check,
  Smartphone,
  Clock
} from 'lucide-react';
import { Product, ProductCategory, ClinicSettings } from '../types';
import { ProductCard } from './ProductCard';
import { PunjabGovLogo } from './PunjabGovLogo';

interface StoreSectionProps {
  products: Product[];
  selectedCategory: ProductCategory;
  setSelectedCategory: (category: ProductCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  openPrescriptionModal: () => void;
  openConsultationModal: () => void;
  clinicSettings?: ClinicSettings;
}

export const StoreSection: React.FC<StoreSectionProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onAddToCart,
  onQuickView,
  openPrescriptionModal,
  openConsultationModal,
  clinicSettings,
}) => {
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');
  const [showOnlyCustomClinic, setShowOnlyCustomClinic] = useState<boolean>(false);
  const [copiedJazzCash, setCopiedJazzCash] = useState<boolean>(false);

  const handleCopyJazzCash = () => {
    navigator.clipboard.writeText('0300-4202383');
    setCopiedJazzCash(true);
    setTimeout(() => setCopiedJazzCash(false), 2000);
  };

  const categories: { key: ProductCategory; label: string; urduLabel: string; icon?: string }[] = [
    { key: 'all', label: 'All Medicines', urduLabel: 'تمام ادویات' },
    { key: 'sugar_diabetes', label: 'Sugar & Diabetes', urduLabel: 'شوگر اور ذیابیطس' },
    { key: 'blood_pressure', label: 'Blood Pressure & Heart', urduLabel: 'بلڈ پریشر اور دل' },
    { key: 'digestive_liver', label: 'Digestive, Acidity & Liver', urduLabel: 'معدہ، تیزابیت اور جگر' },
    { key: 'fertility_reproductive', label: 'Fertility & Infertility', urduLabel: 'بے اولادی اور نسوانی امراض' },
    { key: 'kidney_urinary', label: 'Kidney Stones & Renal', urduLabel: 'گردے کی پتھری اور پیشاب' },
    { key: 'joint_arthritis', label: 'Joint Pain & Arthritis', urduLabel: 'جوڑوں کا درد اور کمر درد' },
    { key: 'skin_hair', label: 'Skin, Acne & Complexion', urduLabel: 'جلد، چھائیاں اور دانے' },
    { key: 'immunity_tonics', label: 'Immunity & Family Tonics', urduLabel: 'قوت مدافعت اور مقویات' },
    { key: 'clinical_custom', label: 'Custom Clinic Formulations', urduLabel: 'کلینیکل مخصوص نسخہ جات' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Custom Clinic Filter
        if (showOnlyCustomClinic && !p.isSpecialClinicFormula) {
          return false;
        }

        // Form filter
        if (selectedForm !== 'all' && p.form !== selectedForm) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchUrdu = p.urduName.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchIndication = p.indications.some((ind) => ind.toLowerCase().includes(q));
          const matchComp = p.composition.some((comp) => comp.toLowerCase().includes(q));
          if (!matchName && !matchUrdu && !matchDesc && !matchIndication && !matchComp) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.discountedPrice - b.discountedPrice;
        if (sortBy === 'price_high') return b.discountedPrice - a.discountedPrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default featured
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [products, selectedCategory, selectedForm, showOnlyCustomClinic, searchQuery, sortBy]);

  return (
    <section id="store-section" className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Store Title & SEO Subtitle with Doctor & Governor House Credentials */}
        <div className="mb-6 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            
            {/* Left Side: Honorary Physician to Governor Punjab with Timing & Background Punjab Govt Logo */}
            <div className="lg:col-span-4 h-full flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-white via-sky-50/60 to-blue-100/70 text-slate-800 p-4 rounded-xl border border-blue-200 shadow-xs">
              {/* Background Government of Punjab Logo Watermark */}
              <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none transform rotate-12 scale-150">
                <PunjabGovLogo size="xl" className="w-32 h-32" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-50/40 via-transparent to-white/60 pointer-events-none"></div>

              <div className="relative z-10 space-y-3">
                {/* Header with Emblem */}
                <div className="flex items-start gap-3">
                  <PunjabGovLogo size="lg" className="shrink-0 border-blue-300 shadow-sm mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold bg-blue-700 text-white px-2 py-0.5 rounded font-mono shadow-2xs">
                        Govt. of the Punjab
                      </span>
                      <span className="text-[10px] text-blue-900 font-bold bg-blue-100 border border-blue-300 px-1.5 py-0.2 rounded">
                        Governor House
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-blue-950 leading-tight">
                      Honorary Physician to Governor Punjab
                    </h4>
                    <p className="font-urdu text-xs text-blue-800 font-semibold" dir="rtl">
                      اعزازی معالج گورنر ہاؤس پنجاب
                    </p>
                  </div>
                </div>

                {/* Timing Badge: 2:00 PM to 4:00 PM Every Saturday */}
                <div className="bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-blue-200 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-blue-900 font-extrabold text-xs">
                      <Clock className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span>2:00 PM — 4:00 PM</span>
                    </div>
                    <span className="text-[10px] font-black uppercase bg-red-600 text-white px-2 py-0.5 rounded tracking-wide font-mono shadow-2xs">
                      Every Saturday
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
                    <span className="text-blue-900 font-semibold">Free OPD Clinic Service</span>
                    <span className="font-urdu text-blue-800 font-bold" dir="rtl">
                      ہر ہفتہ دوپہر 2 سے 4 بجے تک مفت او پی ڈی
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Pure Homeopathic Remedies & Potencies Title */}
            <div className="lg:col-span-4 h-full flex flex-col justify-center items-center text-center space-y-1 px-1 py-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-900 bg-blue-100 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-blue-700" />
                <span>Online Pharmacy & Clinic Store</span>
              </span>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold font-display text-slate-900 tracking-tight">
                Pure Homeopathic Remedies & Potencies
              </h2>
              <p className="font-urdu text-xs sm:text-sm text-blue-900 font-semibold" dir="rtl">
                ڈاکٹر اعجاز احمد کی تصدیق شدہ جرمن اور کلینیکل ادویات
              </p>
              <p className="text-[11px] text-slate-500">
                100% authentic, side-effect-free German standard medicines.
              </p>
            </div>

            {/* Right Side: Doctor's Picture, JazzCash & Book Appointment via WhatsApp */}
            <div className="lg:col-span-4 h-full flex flex-col justify-between bg-gradient-to-br from-white via-sky-50/60 to-blue-100/70 p-4 rounded-xl border border-blue-200 shadow-xs space-y-2.5">
              {/* Doctor Info & Photo */}
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-13 h-13 rounded-xl bg-white p-0.5 shadow-sm border-2 border-blue-600 overflow-hidden">
                    <img 
                      src={clinicSettings?.doctorImageUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"} 
                      alt="Dr. Ejaz Ahmad"
                      className="w-full h-full object-cover rounded-[10px]"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] text-white font-bold" title="Available for consultation">
                    ✓
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] text-blue-800 font-bold uppercase tracking-wider block">
                      Consultant Homeopath
                    </span>
                    <span className="text-[10px] bg-blue-100 border border-blue-200 text-blue-900 font-bold px-1.5 py-0.2 rounded flex items-center gap-1">
                      <Video className="w-2.5 h-2.5 text-blue-700" /> Video Call
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {clinicSettings?.name || 'Dr. Ejaz Ahmad'}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium truncate">
                    {clinicSettings?.qualifications || 'D.H.M.S (Pak)'} • 35+ Yrs Exp.
                  </p>
                </div>
              </div>

              {/* JazzCash Account Box */}
              <div className="bg-white/95 p-2 rounded-lg border border-blue-200 shadow-2xs space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 bg-red-600 text-white font-black text-[10px] rounded tracking-wide font-mono">
                      JazzCash
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 font-mono tracking-wider">
                      0300-4202383
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyJazzCash}
                    className="px-2 py-0.5 bg-sky-50 hover:bg-blue-100 text-blue-900 text-[11px] font-bold rounded border border-blue-200 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Copy JazzCash Number"
                  >
                    {copiedJazzCash ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-blue-700" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-700 font-medium leading-tight">
                  <strong className="text-blue-950">Pay Online</strong> as book your Online Appointment via <strong>WhatsApp Video Call</strong>.
                </p>
                <p className="font-urdu text-[11px] text-blue-900 font-semibold leading-tight" dir="rtl">
                  آن لائن فیس ادا کر کے واٹس ایپ ویڈیو کال پر مشورہ حاصل کریں۔
                </p>
              </div>

              {/* Book Appointment Action */}
              <div className="flex items-center gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={openConsultationModal}
                  className="flex-1 px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-sky-200" />
                  <span>Book Appointment (2000/- PKR)</span>
                </button>
                <a
                  href="https://wa.me/923004202383?text=Salam%20Dr.%20Ejaz%20Ahmad,%20I%20want%20to%20book%20an%20Online%20WhatsApp%20Video%20Call%20Consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-xs transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                  title="Direct WhatsApp"
                >
                  <Phone className="w-3 h-3 text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-5 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div id="store-search-filter-section" className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-3 scroll-mt-24">
          
          {/* Active Search / Clear */}
          <div className="relative w-full md:w-80">
            <input
              id="store-remedies-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search remedies, symptoms, potencies..."
              className="w-full pl-8 pr-7 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs">
            
            {/* Form Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Form:</span>
              <select
                value={selectedForm}
                onChange={(e) => setSelectedForm(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              >
                <option value="all">All Forms</option>
                <option value="Liquid / Q">Mother Tinctures (Q)</option>
                <option value="Drops">Potency Drops</option>
                <option value="Syrup">Syrups & Tonics</option>
                <option value="Custom Clinic Pack">Custom Clinic Packs</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              >
                <option value="featured">Featured / Best Match</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Special Clinic Toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer bg-slate-50 px-2.5 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-100">
              <input
                type="checkbox"
                checked={showOnlyCustomClinic}
                onChange={(e) => setShowOnlyCustomClinic(e.target.checked)}
                className="rounded text-emerald-700 focus:ring-emerald-500"
              />
              <span className="text-slate-700 font-semibold">Doctor's Custom Formulations</span>
            </label>

          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>
            Showing <strong>{filteredProducts.length}</strong> remedies in{' '}
            <strong>{categories.find((c) => c.key === selectedCategory)?.label}</strong>
          </span>
          {searchQuery && (
            <span>
              Search query: "<strong>{searchQuery}</strong>"
            </span>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              No matching remedies found
            </h3>
            <p className="text-xs text-slate-500">
              Try searching with another health term or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedForm('all');
                setSearchQuery('');
                setShowOnlyCustomClinic(false);
              }}
              className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
