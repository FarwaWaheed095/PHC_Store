import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertCircle, 
  Phone,
  Calendar,
  Share2
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedPotency?: string) => void;
  openConsultationModal: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  openConsultationModal,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedPotency, setSelectedPotency] = useState<string>(product.potency);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedPotency);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Image & Badges */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-1 rounded-md shadow-xs">
                  SAVE {discountPercent}%
                </span>
              )}
            </div>

            {/* Zero Side Effects Box */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-950 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Zero Side Effects Promise</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Safe, gentle, and non-habit forming. Prepared per standard German Homeopathic Pharmacopoeia.
              </p>
            </div>

            {/* Nationwide Courier Note */}
            <div className="flex items-center gap-2 text-xs text-slate-600 px-1">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Discreet Nationwide Delivery via TCS / Leopard</span>
            </div>
          </div>

          {/* Right Column: Detailed Info */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                <span className="bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {product.category.replace('_', ' ').toUpperCase()}
                </span>
                <span>•</span>
                <span className="text-slate-500 font-normal">{product.form}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 leading-tight">
                {product.name}
              </h2>

              <p className="font-urdu text-base text-emerald-800 font-semibold pt-1" dir="rtl">
                {product.urduName}
              </p>

              <div className="flex items-center gap-3 pt-2 text-xs">
                <div className="flex items-center text-amber-500 font-bold gap-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400">({product.reviewsCount} patient reviews)</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  {product.inStock ? `In Stock (${product.stockCount})` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 line-through mr-2">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
                <span className="text-2xl font-black text-slate-900">
                  PKR {product.discountedPrice.toLocaleString()}
                </span>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                Save PKR {(product.originalPrice - product.discountedPrice).toLocaleString()}
              </span>
            </div>

            {/* Description */}
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
              <p>{product.description}</p>
              {product.urduDescription && (
                <p className="font-urdu text-emerald-900 text-xs bg-emerald-50/50 p-2.5 rounded-lg" dir="rtl">
                  {product.urduDescription}
                </p>
              )}
            </div>

            {/* Indications & Benefits */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Key Medical Indications:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                {product.indications.map((ind, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-md border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{ind}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Composition */}
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-900">Composition / Active Ingredients:</span>
              <p className="text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                {product.composition.join(' • ')}
              </p>
            </div>

            {/* Dosage Instructions */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>Dosage & Method of Use:</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                {product.dosage}
              </p>
              {product.urduDosage && (
                <p className="font-urdu text-amber-950 font-semibold pt-0.5 text-xs" dir="rtl">
                  {product.urduDosage}
                </p>
              )}
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-2 border-t border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                    product.inStock
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white active:scale-98'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {addedToast ? 'Added to Cart!' : `Add to Cart • PKR ${(product.discountedPrice * quantity).toLocaleString()}`}
                  </span>
                </button>
              </div>

              {/* Consultation Secondary CTA */}
              <div className="text-center pt-1">
                <button
                  onClick={() => {
                    onClose();
                    openConsultationModal();
                  }}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline"
                >
                  Need personalized potency recommendation from Dr. Ejaz Ahmad? Book Consultation (Rs 2,000)
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
