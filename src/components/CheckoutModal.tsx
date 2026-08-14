import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  Building2, 
  Phone, 
  MapPin, 
  Send, 
  ShieldCheck,
  ShoppingBag,
  FileCheck
} from 'lucide-react';
import { CartItem, Order } from '../types';
import { DOCTOR_INFO } from '../data/initialData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderPlaced: (order: Order) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderPlaced,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'tcs_express' | 'leopard_courier' | 'lahore_same_day' | 'clinic_pickup'>('tcs_express');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash_easypaisa' | 'bank_transfer' | 'clinic_pay'>('cod');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );
  const isFreeShipping = subtotal >= 3500 || deliveryMethod === 'clinic_pickup';
  const shippingFee = items.length > 0 ? (isFreeShipping ? 0 : (deliveryMethod === 'lahore_same_day' ? 200 : 250)) : 0;
  const total = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill all required customer contact and address fields.');
      return;
    }

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      customerName,
      phone,
      city,
      address,
      deliveryMethod,
      paymentMethod,
      items: items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        potency: i.selectedPotency || i.product.potency,
        quantity: i.quantity,
        price: i.product.discountedPrice,
      })),
      subtotal,
      shippingFee,
      discount: 0,
      total,
      status: 'Confirmed',
      notes: orderNotes,
    };

    onOrderPlaced(newOrder);
    setConfirmedOrder(newOrder);
    onClearCart();
    setIsSuccess(true);
  };

  const handleWhatsAppSend = () => {
    if (!confirmedOrder) return;
    const itemList = confirmedOrder.items
      .map((it, idx) => `${idx + 1}. ${it.productName} (${it.potency}) x ${it.quantity} = PKR ${it.price * it.quantity}`)
      .join('%0A');

    const msg = `*New Order Confirmed - Punjab Homeopathic Clinic*%0A%0A` +
      `*Order ID:* ${confirmedOrder.id}%0A` +
      `*Customer:* ${confirmedOrder.customerName}%0A` +
      `*Phone:* ${confirmedOrder.phone}%0A` +
      `*City:* ${confirmedOrder.city}%0A` +
      `*Address:* ${confirmedOrder.address}%0A` +
      `*Delivery:* ${confirmedOrder.deliveryMethod.replace('_', ' ').toUpperCase()}%0A` +
      `*Payment:* ${confirmedOrder.paymentMethod.replace('_', ' ').toUpperCase()}%0A%0A` +
      `*Items Ordered:*%0A${itemList}%0A%0A` +
      `*Subtotal:* PKR ${confirmedOrder.subtotal}%0A` +
      `*Shipping:* PKR ${confirmedOrder.shippingFee}%0A` +
      `*Grand Total:* PKR ${confirmedOrder.total}%0A%0A` +
      `*Notes:* ${confirmedOrder.notes || 'None'}`;

    window.open(`https://wa.me/${DOCTOR_INFO.whatsapp.replace(/\D/g, '')}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
        
        {/* Close */}
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
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Punjab Homeopathic Checkout & Delivery</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-slate-900">
                Complete Your Medicine Order
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Fast & discreet doorstep delivery across Lahore and all cities in Pakistan.
              </p>
            </div>

            {/* Order Items Preview */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-bold text-slate-700 flex justify-between">
                <span>Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="text-emerald-800 font-extrabold">Total: PKR {total.toLocaleString()}</span>
              </div>
              <div className="max-h-28 overflow-y-auto space-y-1 pr-1 text-xs text-slate-600">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between py-0.5">
                    <span className="truncate pr-2">{item.product.name} x {item.quantity}</span>
                    <span className="font-semibold text-slate-900 shrink-0">
                      PKR {(item.product.discountedPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Recipient's Name"
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

              {/* City & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Lahore"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Complete Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House #, Street #, Colony / Sector"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Delivery Courier Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Select Delivery Courier:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('tcs_express')}
                    className={`p-2.5 rounded-xl border text-left text-xs ${
                      deliveryMethod === 'tcs_express' ? 'border-emerald-700 bg-emerald-50 font-bold text-emerald-900' : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div>TCS Express</div>
                    <div className="text-[10px] text-slate-500 font-normal">24-48 Hours</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('leopard_courier')}
                    className={`p-2.5 rounded-xl border text-left text-xs ${
                      deliveryMethod === 'leopard_courier' ? 'border-emerald-700 bg-emerald-50 font-bold text-emerald-900' : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div>Leopard Courier</div>
                    <div className="text-[10px] text-slate-500 font-normal">Nationwide</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('lahore_same_day')}
                    className={`p-2.5 rounded-xl border text-left text-xs ${
                      deliveryMethod === 'lahore_same_day' ? 'border-emerald-700 bg-emerald-50 font-bold text-emerald-900' : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div>Lahore Same Day</div>
                    <div className="text-[10px] text-slate-500 font-normal">By Rider</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('clinic_pickup')}
                    className={`p-2.5 rounded-xl border text-left text-xs ${
                      deliveryMethod === 'clinic_pickup' ? 'border-emerald-700 bg-emerald-50 font-bold text-emerald-900' : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div>Clinic Pickup</div>
                    <div className="text-[10px] text-slate-500 font-normal">Garhi Shahu</div>
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Payment Method:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left text-xs ${
                      paymentMethod === 'cod' ? 'border-emerald-700 bg-emerald-50 font-bold text-emerald-900' : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div className="font-bold">Cash on Delivery</div>
                    <div className="text-[11px] text-slate-500 font-normal">Pay cash to rider</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash_easypaisa')}
                    className={`p-3 rounded-xl border text-left text-xs ${
                      paymentMethod === 'jazzcash_easypaisa' ? 'border-emerald-700 bg-emerald-50 font-bold text-emerald-900' : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div className="font-bold">JazzCash / EasyPaisa</div>
                    <div className="text-[11px] text-slate-500 font-normal">0300-4567890</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3 rounded-xl border text-left text-xs ${
                      paymentMethod === 'bank_transfer' ? 'border-emerald-700 bg-emerald-50 font-bold text-emerald-900' : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div className="font-bold">Meezan / HBL Bank</div>
                    <div className="text-[11px] text-slate-500 font-normal">Online Transfer</div>
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Special Delivery Instructions / Doctor Prescription Note
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Please call before delivery / Add custom 200C potency"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Submit Total Bar */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 block">Grand Total Payable:</span>
                  <span className="text-2xl font-black text-emerald-950">
                    PKR {total.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold text-sm rounded-xl shadow-lg transition-all active:scale-98"
                >
                  Place Order Now
                </button>
              </div>

            </form>

          </div>
        ) : (
          /* Order Confirmation Screen */
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Order #{confirmedOrder?.id}
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900 mt-2">
                Thank You for Your Order!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Your order is confirmed at <strong>Punjab Homeopathic Clinic</strong> and is being prepared for dispatch.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-left space-y-2 max-w-md mx-auto">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Customer:</span>
                <span className="font-bold text-slate-900">{confirmedOrder?.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Contact Phone:</span>
                <span className="font-bold text-slate-900">{confirmedOrder?.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="font-medium text-slate-700">{confirmedOrder?.address}, {confirmedOrder?.city}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Payment:</span>
                <span className="font-bold text-emerald-800 uppercase">{confirmedOrder?.paymentMethod.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-sm">
                <span className="text-slate-900">Total Bill:</span>
                <span className="text-emerald-900 font-extrabold">PKR {confirmedOrder?.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={handleWhatsAppSend}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Order Receipt on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-colors"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
