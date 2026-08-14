import React from 'react';
import { ShoppingBag, Star, ShieldCheck, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const discountPercent = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Product Image Area */}
        <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Discount Badge */}
          {discountPercent > 0 && (
            <span className="absolute top-2.5 right-2.5 bg-amber-400 text-slate-950 text-[11px] font-black px-2 py-0.5 rounded-md shadow-xs">
              {discountPercent}% OFF
            </span>
          )}

          {/* Special Feature / Category Badge */}
          {product.badge && (
            <span className={`absolute top-2.5 left-2.5 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs text-white ${
              product.isSpecialClinicFormula ? 'bg-emerald-700' : 'bg-slate-900/80 backdrop-blur-xs'
            }`}>
              {product.badge}
            </span>
          )}

          {/* Quick View Button on Image */}
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-2.5 right-2.5 p-2 bg-white/90 hover:bg-white text-slate-800 rounded-full shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
            title="Quick View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-2.5">
          
          {/* Potency & Rating */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs">
            <span className="bg-emerald-50 text-emerald-800 font-bold px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] truncate max-w-[90px] sm:max-w-none">
              {product.potency}
            </span>
            <div className="flex items-center text-amber-500 font-bold gap-1 text-[11px] sm:text-xs">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 hidden sm:inline">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <div>
            <h3 
              onClick={() => onQuickView(product)}
              className="text-xs sm:text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1 cursor-pointer"
            >
              {product.name}
            </h3>
            <p className="font-urdu text-[11px] sm:text-xs text-emerald-700 font-medium truncate pt-0.5" dir="rtl">
              {product.urduName}
            </p>
          </div>

          {/* Indications Preview */}
          <div className="space-y-0.5 sm:space-y-1">
            <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Key Indications:
            </div>
            <ul className="text-[11px] sm:text-xs text-slate-600 space-y-0.5">
              {product.indications.slice(0, 2).map((ind, idx) => (
                <li key={idx} className="truncate flex items-center gap-1">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">{ind}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Custom clinic banner note if applicable */}
          {product.isSpecialClinicFormula && (
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-lg p-1.5 sm:p-2 text-[10px] sm:text-[11px] text-emerald-900 font-medium flex items-center gap-1 sm:gap-1.5">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-700 shrink-0" />
              <span className="truncate">Prepared at Clinic</span>
            </div>
          )}

        </div>
      </div>

      {/* Pricing & Footer Button */}
      <div className="p-3 sm:p-4 pt-0 border-t border-slate-100 mt-1 sm:mt-2 space-y-2 sm:space-y-3">
        <div className="flex items-baseline justify-between pt-1.5 sm:pt-2">
          <div>
            <span className="text-[10px] sm:text-xs text-slate-400 line-through mr-1">
              PKR {product.originalPrice.toLocaleString()}
            </span>
            <span className="text-sm sm:text-lg font-extrabold text-slate-900 block sm:inline">
              PKR {product.discountedPrice.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 hidden xs:inline">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="w-full py-1.5 sm:py-2 px-1.5 sm:px-2 text-[11px] sm:text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg sm:rounded-xl transition-colors text-center"
          >
            Details
          </button>

          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`w-full py-1.5 sm:py-2 px-1.5 sm:px-2 text-[11px] sm:text-xs font-bold text-white rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1 sm:gap-1.5 shadow-xs ${
              product.inStock
                ? 'bg-emerald-700 hover:bg-emerald-800 active:scale-98'
                : 'bg-slate-300 cursor-not-allowed text-slate-500'
            }`}
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

    </div>
  );
};
