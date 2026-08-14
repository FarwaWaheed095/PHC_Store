import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onOpenStore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onOpenStore,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );

  const freeShippingThreshold = 3500;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = items.length > 0 ? (isFreeShipping ? 0 : 250) : 0;
  const grandTotal = subtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Your Medicine Bag
              </h3>
              <p className="text-xs text-slate-500">
                {items.length} {items.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-emerald-50 px-4 py-2.5 border-b border-emerald-100 text-xs">
          {isFreeShipping ? (
            <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Congratulations! You unlocked FREE Nationwide Delivery.</span>
            </div>
          ) : (
            <div className="space-y-1 text-slate-700">
              <div className="flex justify-between">
                <span>Add <strong>PKR {(freeShippingThreshold - subtotal).toLocaleString()}</strong> more for FREE Shipping!</span>
                <span className="font-bold">{Math.round((subtotal / freeShippingThreshold) * 100)}%</span>
              </div>
              <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-700 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-base">Your Cart is Empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Explore our verified natural homeopathic medicines for Sugar, Blood Pressure, Digestion & Fertility.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenStore();
                }}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Browse Online Store
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex gap-3 items-center"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-white"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h5 className="text-xs font-bold text-slate-900 truncate">
                    {item.product.name}
                  </h5>
                  <div className="text-[11px] text-emerald-800 font-semibold">
                    {item.selectedPotency || item.product.potency}
                  </div>
                  <div className="text-xs font-extrabold text-slate-900">
                    PKR {(item.product.discountedPrice * item.quantity).toLocaleString()}
                    {item.quantity > 1 && (
                      <span className="text-[10px] text-slate-400 font-normal ml-1">
                        (PKR {item.product.discountedPrice.toLocaleString()} each)
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center border border-slate-200 bg-white rounded-lg overflow-hidden">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-bold text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery (Nationwide Courier):</span>
                <span className="font-bold text-slate-900">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-extrabold uppercase">Free</span>
                  ) : (
                    `PKR ${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                <span>Total Amount:</span>
                <span className="text-emerald-900 text-base">PKR {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              id="cart-proceed-checkout-btn"
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600" /> Cash on Delivery
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Genuine Potencies
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
