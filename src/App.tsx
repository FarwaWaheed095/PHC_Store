import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { NewsTicker } from './components/NewsTicker';
import { Hero } from './components/Hero';
import { GovernorHouseBanner } from './components/GovernorHouseBanner';
import { StoreSection } from './components/StoreSection';
import { FertilitySection } from './components/FertilitySection';
import { WhyHomeopathy } from './components/WhyHomeopathy';
import { DoctorProfileSection } from './components/DoctorProfileSection';
import { SymptomAdvisor } from './components/SymptomAdvisor';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ConsultationModal } from './components/ConsultationModal';
import { CustomPrescriptionModal } from './components/CustomPrescriptionModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { MobileBottomNav } from './components/MobileBottomNav';

import { 
  INITIAL_PRODUCTS, 
  INITIAL_REVIEWS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_ORDERS,
  DOCTOR_INFO 
} from './data/initialData';
import { Product, ProductCategory, CartItem, Appointment, Order, ClinicSettings, Review } from './types';
import { Phone, ShoppingBag, Calendar, MessageSquare } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Clinic Settings State with LocalStorage persistence
  const [clinicSettings, setClinicSettings] = useState<ClinicSettings>(() => {
    try {
      const saved = localStorage.getItem('phc_clinic_settings');
      return saved ? JSON.parse(saved) : DOCTOR_INFO;
    } catch {
      return DOCTOR_INFO;
    }
  });

  // Products State with Local Storage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('phc_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Reviews State with Local Storage persistence
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('phc_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('phc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Appointments State
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('phc_appointments');
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('phc_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Smooth scroll to store remedies section and focus search box
  const handleGoToStore = (category?: ProductCategory) => {
    if (category) {
      setSelectedCategory(category);
    }
    setActiveTab('store');
    setTimeout(() => {
      const searchSection = document.getElementById('store-search-filter-section') || document.getElementById('store-section');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      const searchInput = document.getElementById('store-remedies-search-input') as HTMLInputElement | null;
      if (searchInput) {
        searchInput.focus({ preventScroll: true });
        searchInput.select?.();
      }
    }, 100);
  };

  // Modals & Drawers State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('phc_clinic_settings', JSON.stringify(clinicSettings));
    } catch (e) {
      console.error(e);
    }
  }, [clinicSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('phc_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('phc_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('phc_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('phc_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.error(e);
    }
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem('phc_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Cart Operations
  const handleAddToCart = (product: Product, quantity = 1, selectedPotency?: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        if (selectedPotency) {
          updated[existingIdx].selectedPotency = selectedPotency;
        }
        return updated;
      } else {
        return [...prev, { product, quantity, selectedPotency: selectedPotency || product.potency }];
      }
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Appointment & Order Handlers
  const handleBookAppointment = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Admin Operations
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleUpdateAppointmentStatus = (appointmentId: string, status: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === appointmentId ? { ...a, status } : a))
    );
  };

  const handleAddAppointment = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleUpdateClinicSettings = (newSettings: ClinicSettings) => {
    setClinicSettings(newSettings);
  };

  const handleResetClinicSettings = () => {
    setClinicSettings(DOCTOR_INFO);
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const fertilityProducts = products.filter(
    (p) => p.category === 'fertility_reproductive'
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartTotalItems}
        openCart={() => setIsCartOpen(true)}
        openConsultationModal={() => setIsConsultationOpen(true)}
        openAdminModal={() => setIsAdminPortalOpen(true)}
        openPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        clinicSettings={clinicSettings}
      />

      {/* Live Breaking News / Doctor Credentials Headline Ticker */}
      <NewsTicker
        clinicSettings={clinicSettings}
        openConsultationModal={() => setIsConsultationOpen(true)}
        openPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* 1. Pure Homeopathic Remedies & Potencies (Featured Store Section FIRST as requested) */}
            <StoreSection
              products={products}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onAddToCart={handleAddToCart}
              onQuickView={(product) => setQuickViewProduct(product)}
              openPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
              openConsultationModal={() => setIsConsultationOpen(true)}
              clinicSettings={clinicSettings}
            />

            {/* 2. Saturday Governor House Free Clinic Section */}
            <GovernorHouseBanner
              openConsultationModal={() => setIsConsultationOpen(true)}
              clinicSettings={clinicSettings}
            />

            {/* 3. Doctor Ejaz Ahmad Profile & Clinical Bio */}
            <DoctorProfileSection
              openConsultationModal={() => setIsConsultationOpen(true)}
              clinicSettings={clinicSettings}
            />

            {/* 4. Dedicated Fertility & Reproductive Care Highlight */}
            <FertilitySection
              fertilityProducts={fertilityProducts}
              onAddToCart={handleAddToCart}
              onQuickView={(product) => setQuickViewProduct(product)}
              openConsultationModal={() => setIsConsultationOpen(true)}
            />

            {/* 5. Interactive Clinical Symptom Advisor */}
            <SymptomAdvisor
              onSelectCategory={(cat) => handleGoToStore(cat)}
              openConsultationModal={() => setIsConsultationOpen(true)}
            />

            {/* 6. Why Homeopathy Educational & Treatment Highlights */}
            <WhyHomeopathy
              openConsultationModal={() => setIsConsultationOpen(true)}
              goToStore={() => handleGoToStore()}
            />

            {/* 7. Patient Reviews & Verified Testimonials */}
            <ReviewsSection reviews={reviews} />
          </div>
        )}

        {activeTab === 'store' && (
          <StoreSection
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onAddToCart={handleAddToCart}
            onQuickView={(product) => setQuickViewProduct(product)}
            openPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
            openConsultationModal={() => setIsConsultationOpen(true)}
            clinicSettings={clinicSettings}
          />
        )}

        {activeTab === 'fertility' && (
          <div>
            <FertilitySection
              fertilityProducts={fertilityProducts}
              onAddToCart={handleAddToCart}
              onQuickView={(product) => setQuickViewProduct(product)}
              openConsultationModal={() => setIsConsultationOpen(true)}
            />

            <WhyHomeopathy
              openConsultationModal={() => setIsConsultationOpen(true)}
              goToStore={() => handleGoToStore()}
            />
          </div>
        )}

        {activeTab === 'about' && (
          <div>
            <DoctorProfileSection
              openConsultationModal={() => setIsConsultationOpen(true)}
              clinicSettings={clinicSettings}
            />
            <GovernorHouseBanner
              openConsultationModal={() => setIsConsultationOpen(true)}
              clinicSettings={clinicSettings}
            />
            <ReviewsSection reviews={reviews} />
          </div>
        )}

        {activeTab === 'why-homeopathy' && (
          <div>
            <WhyHomeopathy
              openConsultationModal={() => setIsConsultationOpen(true)}
              goToStore={() => handleGoToStore()}
            />
            <SymptomAdvisor
              onSelectCategory={(cat) => handleGoToStore(cat)}
              openConsultationModal={() => setIsConsultationOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Floating Action Buttons for Quick Access */}
      <div className="fixed bottom-20 md:bottom-4 right-3 md:right-4 z-40 flex flex-col items-end gap-2.5">
        {/* WhatsApp Direct */}
        <a
          href={`https://wa.me/${clinicSettings.whatsapp.replace(/\D/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(clinicSettings.name)},%20I%20want%20to%20inquire%20about%20Homeopathic%20consultation%20and%20medicines.`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 md:p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
          title={`WhatsApp ${clinicSettings.clinicName}`}
        >
          <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold hidden md:inline">
            WhatsApp Doctor
          </span>
        </a>

        {/* Quick Consultation Trigger (Desktop only as mobile has bottom nav) */}
        <button
          onClick={() => setIsConsultationOpen(true)}
          className="hidden md:flex p-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all items-center justify-center group"
          title={`Book Consultation (${clinicSettings.consultationFee.toLocaleString()} PKR)`}
        >
          <Calendar className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold">
            Book Appointment (Rs {Math.round(clinicSettings.consultationFee / 1000)}k)
          </span>
        </button>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartTotalItems}
        openCart={() => setIsCartOpen(true)}
        openConsultationModal={() => setIsConsultationOpen(true)}
        clinicSettings={clinicSettings}
      />

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          if (tab === 'store') {
            handleGoToStore();
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onSelectCategory={(cat) => handleGoToStore(cat)}
        openConsultationModal={() => setIsConsultationOpen(true)}
        openPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        openAdminPortal={() => setIsAdminPortalOpen(true)}
        clinicSettings={clinicSettings}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        openConsultationModal={() => setIsConsultationOpen(true)}
      />

      {/* Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        onBookAppointment={handleBookAppointment}
        clinicSettings={clinicSettings}
      />

      {/* Custom Prescription Dispensing Modal */}
      <CustomPrescriptionModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        openConsultationModal={() => setIsConsultationOpen(true)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onOpenStore={() => handleGoToStore()}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderPlaced={handleOrderPlaced}
        onClearCart={handleClearCart}
      />

      {/* Doctor & Staff Management Admin Portal */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        products={products}
        appointments={appointments}
        orders={orders}
        reviews={reviews}
        clinicSettings={clinicSettings}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
        onAddAppointment={handleAddAppointment}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onUpdateClinicSettings={handleUpdateClinicSettings}
        onResetClinicSettings={handleResetClinicSettings}
        onAddReview={handleAddReview}
        onDeleteReview={handleDeleteReview}
      />

    </div>
  );
}

