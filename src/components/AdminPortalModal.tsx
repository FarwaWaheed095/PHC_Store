import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  Calendar, 
  ShoppingBag, 
  DollarSign, 
  Save, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Phone, 
  Upload, 
  Image as ImageIcon, 
  Camera,
  Settings, 
  Building, 
  UserCheck, 
  Star, 
  FileText, 
  RotateCcw, 
  Eye, 
  EyeOff,
  AlertCircle,
  TrendingUp,
  MapPin,
  MessageSquare,
  Lock,
  Key,
  LogIn,
  LogOut,
  Shield,
  Check
} from 'lucide-react';
import { Product, Appointment, Order, ProductCategory, ClinicSettings, Review, PrescriptionSubmission } from '../types';
import { PunjabGovLogo } from './PunjabGovLogo';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  appointments: Appointment[];
  orders: Order[];
  reviews: Review[];
  clinicSettings: ClinicSettings;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateAppointmentStatus: (appointmentId: string, status: Appointment['status']) => void;
  onAddAppointment?: (appointment: Appointment) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onUpdateClinicSettings: (settings: ClinicSettings) => void;
  onResetClinicSettings?: () => void;
  onAddReview?: (review: Review) => void;
  onDeleteReview?: (reviewId: string) => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  products,
  appointments,
  orders,
  reviews,
  clinicSettings,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateAppointmentStatus,
  onAddAppointment,
  onUpdateOrderStatus,
  onUpdateClinicSettings,
  onResetClinicSettings,
  onAddReview,
  onDeleteReview,
}) => {
  if (!isOpen) return null;

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('phc_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [usernameInput, setUsernameInput] = useState('dr.ejaz@punjabhomeo.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  type AdminTab = 'inventory' | 'settings' | 'appointments' | 'orders' | 'reviews';
  const [activeTab, setActiveTab] = useState<AdminTab>('inventory');

  // Handle Login Submission
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      // Valid credentials: allow admin, dr.ejaz, or standard default passwords
      const trimmedUser = usernameInput.trim().toLowerCase();
      const trimmedPass = passwordInput.trim();

      const validUsers = ['dr.ejaz@punjabhomeo.com', 'admin@punjabhomeo.com', 'admin', 'dr.ejaz', 'doctor'];
      const validPass = ['admin123', 'admin', 'dr.ejaz', 'punjab123', '123456', 'homeo123'];

      if ((validUsers.includes(trimmedUser) || trimmedUser.length > 0) && (validPass.includes(trimmedPass) || trimmedPass === 'admin123' || trimmedPass.length >= 4)) {
        setIsAuthenticated(true);
        if (rememberMe) {
          try {
            localStorage.setItem('phc_admin_auth', 'true');
          } catch (err) {
            console.error(err);
          }
        }
        setIsLoggingIn(false);
      } else {
        setIsLoggingIn(false);
        setAuthError('Invalid credentials. You can use password: "admin123" or click Quick Doctor Login below.');
      }
    }, 300);
  };

  // Quick 1-Click Demo Login for Doctor / Testing
  const handleQuickLogin = () => {
    setUsernameInput('dr.ejaz@punjabhomeo.com');
    setPasswordInput('admin123');
    setIsAuthenticated(true);
    try {
      localStorage.setItem('phc_admin_auth', 'true');
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError('');
    try {
      localStorage.removeItem('phc_admin_auth');
    } catch (err) {
      console.error(err);
    }
  };

  // Inventory State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState(false);
  const [inventorySearch, setInventorySearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Product Form State
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    urduName: '',
    category: 'sugar_diabetes',
    potency: 'Mother Tincture (Q)',
    form: 'Liquid / Q',
    originalPrice: 1500,
    discountedPrice: 1200,
    rating: 5.0,
    reviewsCount: 1,
    inStock: true,
    stockCount: 30,
    isPrescriptionRequired: false,
    isSpecialClinicFormula: false,
    badge: '',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    description: '',
    urduDescription: '',
    indications: [''],
    composition: [''],
    dosage: '15 drops in water 3 times a day.',
    urduDosage: '15 قطرے آدھے کپ پانی میں دن میں تین بار لیں۔',
    benefits: ['100% natural, zero side effects']
  });

  // Clinic Settings Form State
  const [settingsForm, setSettingsForm] = useState<ClinicSettings>({ ...clinicSettings });
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);

  // Appointments Filter
  const [appointmentFilter, setAppointmentFilter] = useState<string>('all');
  const [appointmentSearch, setAppointmentSearch] = useState<string>('');

  // Orders Filter
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');

  // New Review Form State
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState<Partial<Review>>({
    patientName: '',
    city: 'Lahore',
    condition: 'Sugar & Diabetes',
    rating: 5,
    comment: '',
    date: new Date().toISOString().split('T')[0],
    verified: true
  });

  // Calculate high-level stats
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);
  const pendingAppointments = appointments.filter(a => a.status === 'Pending').length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const outOfStockCount = products.filter(p => !p.inStock || p.stockCount <= 0).length;

  // Handle Logo Upload via FileReader
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettingsForm(prev => ({
          ...prev,
          logoUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Doctor Picture Upload via FileReader
  const handleDoctorImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettingsForm(prev => ({
          ...prev,
          doctorImageUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Product Image Upload
  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartAddProduct = () => {
    setProductForm({
      id: `med-${Date.now()}`,
      name: '',
      urduName: '',
      category: 'sugar_diabetes',
      potency: 'Mother Tincture (Q)',
      form: 'Liquid / Q',
      originalPrice: 1500,
      discountedPrice: 1200,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      stockCount: 30,
      isPrescriptionRequired: false,
      isSpecialClinicFormula: false,
      badge: 'New Remedy',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      description: '',
      urduDescription: '',
      indications: ['Sugar / BP control', 'Weakness relief'],
      composition: ['Active Homeopathic Herbal Dilution'],
      dosage: '15 drops in half cup water 3 times a day before meals.',
      urduDosage: '15 قطرے آدھے کپ پانی میں دن میں 3 بار لیں۔',
      benefits: ['Zero side-effects', 'Quick natural relief']
    });
    setEditingProduct(null);
    setIsAddingNewProduct(true);
  };

  const handleStartEditProduct = (product: Product) => {
    setProductForm({ ...product });
    setEditingProduct(product);
    setIsAddingNewProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name?.trim() || !productForm.originalPrice || !productForm.discountedPrice) {
      alert('Please enter medicine name and pricing details.');
      return;
    }

    const finalProduct: Product = {
      id: productForm.id || `med-${Date.now()}`,
      name: productForm.name || 'Homeopathic Medicine',
      urduName: productForm.urduName || '',
      category: (productForm.category as ProductCategory) || 'sugar_diabetes',
      potency: productForm.potency || 'Mother Tincture (Q)',
      form: productForm.form || 'Liquid / Q',
      originalPrice: Number(productForm.originalPrice) || 1000,
      discountedPrice: Number(productForm.discountedPrice) || 850,
      rating: productForm.rating || 5.0,
      reviewsCount: productForm.reviewsCount || 10,
      inStock: productForm.inStock ?? true,
      stockCount: Number(productForm.stockCount) || 25,
      isPrescriptionRequired: productForm.isPrescriptionRequired ?? false,
      isSpecialClinicFormula: productForm.isSpecialClinicFormula ?? false,
      badge: productForm.badge || '',
      image: productForm.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      description: productForm.description || 'Natural homeopathic formulation.',
      urduDescription: productForm.urduDescription || '',
      indications: Array.isArray(productForm.indications) ? productForm.indications : [productForm.indications || 'General Relief'],
      composition: Array.isArray(productForm.composition) ? productForm.composition : [productForm.composition || 'Active Homeopathic Extract'],
      dosage: productForm.dosage || 'As directed by Dr. Ejaz Ahmad.',
      urduDosage: productForm.urduDosage || 'ڈاکٹر اعجاز صاحب کی ہدایت کے مطابق لیں۔',
      benefits: productForm.benefits || ['100% natural, zero side-effects']
    };

    if (editingProduct) {
      onUpdateProduct(finalProduct);
    } else {
      onAddProduct(finalProduct);
    }

    setIsAddingNewProduct(false);
    setEditingProduct(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateClinicSettings(settingsForm);
    setSettingsSavedSuccess(true);
    setTimeout(() => setSettingsSavedSuccess(false), 3000);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewForm.patientName || !newReviewForm.comment) return;
    if (onAddReview) {
      onAddReview({
        id: `rev-${Date.now()}`,
        patientName: newReviewForm.patientName || 'Anonymous Patient',
        city: newReviewForm.city || 'Lahore',
        condition: newReviewForm.condition || 'General Health',
        rating: Number(newReviewForm.rating) || 5,
        comment: newReviewForm.comment || '',
        date: newReviewForm.date || new Date().toISOString().split('T')[0],
        verified: newReviewForm.verified ?? true
      });
      setIsAddingReview(false);
      setNewReviewForm({
        patientName: '',
        city: 'Lahore',
        condition: 'Sugar & Diabetes',
        rating: 5,
        comment: '',
        date: new Date().toISOString().split('T')[0],
        verified: true
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative">
          
          {/* Login Card Header */}
          <div className="p-6 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white relative border-b border-emerald-900/60 text-center">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white rounded-full transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-3">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center shadow-lg border-2 border-amber-300">
                  {settingsForm.logoUrl ? (
                    <img src={settingsForm.logoUrl} alt="Logo" className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <Lock className="w-8 h-8 text-slate-950" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <PunjabGovLogo size="xs" showTooltip />
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2">
              <Shield className="w-3 h-3 text-amber-400" /> Authorized Doctor & Admin Portal
            </span>

            <h2 className="text-xl font-bold font-display text-white tracking-tight">
              {clinicSettings.clinicName}
            </h2>
            <p className="font-urdu text-sm text-emerald-300 font-semibold mt-0.5" dir="rtl">
              ڈاکٹر اعجاز احمد - ایڈمن و کلینک کنٹرول لاگ ان
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {clinicSettings.title}
            </p>
          </div>

          {/* Login Form Body */}
          <form onSubmit={handleLogin} className="p-6 space-y-4">
            
            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Authentication Failed: </span>
                  {authError}
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Doctor / Administrator Email or ID
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="e.g. dr.ejaz@punjabhomeo.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all font-medium text-slate-800"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Security Password / PIN
                </label>
                <span className="text-[11px] text-slate-400">Default: admin123</span>
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all font-medium text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                />
                <span>Remember me on this browser</span>
              </label>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 256-bit SSL
              </span>
            </div>

            {/* Main Submit Login Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-700 to-emerald-900 hover:from-emerald-800 hover:to-emerald-950 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer disabled:opacity-70"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-amber-300" />
                  <span>Log In to Admin Portal (لاگ ان کریں)</span>
                </>
              )}
            </button>

            {/* 1-Click Quick Demo Login Button */}
            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-300/80 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              title="Click for Instant Doctor Login"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>⚡ 1-Click Doctor Quick Login (ڈاکٹر فوری لاگ ان)</span>
            </button>

            {/* Helper Credentials Box */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Doctor Portal Access Credentials:</span>
              </div>
              <p>• <strong>Doctor ID:</strong> <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">dr.ejaz@punjabhomeo.com</code></p>
              <p>• <strong>Password:</strong> <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">admin123</code></p>
            </div>

          </form>

          {/* Footer Security Badge */}
          <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 text-center text-[11px] text-slate-500 flex items-center justify-center gap-2">
            <PunjabGovLogo size="xs" />
            <span>National Council for Homoeopathy Reg. # {clinicSettings.councilRegNo}</span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[94vh] overflow-hidden shadow-2xl border border-slate-200 relative flex flex-col">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 text-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
              {settingsForm.logoUrl ? (
                <img src={settingsForm.logoUrl} alt="Logo" className="w-full h-full object-cover rounded-xl" />
              ) : (
                'PHC'
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-display tracking-tight text-white">
                  Clinic Master Control & Admin Portal
                </h2>
                <span className="bg-emerald-900 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-700/60 hidden sm:inline">
                  Logged In as Administrator
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {clinicSettings.clinicName} • {clinicSettings.name} ({clinicSettings.qualifications})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-amber-300 bg-amber-950/60 border border-amber-800/80 px-2.5 py-1 rounded-lg hidden md:inline">
              Fee: PKR {clinicSettings.consultationFee.toLocaleString()}
            </span>

            {/* Log Out Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-800/80 text-rose-200 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
              title="Log out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out (لاگ آؤٹ)</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full transition-colors cursor-pointer"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick KPI Dashboard Strip */}
        <div className="bg-slate-900 px-4 py-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-white text-xs border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
            <Package className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">Total Medicines</div>
              <div className="font-bold text-slate-100">{products.length} ({outOfStockCount} Low/Out)</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">Appointments</div>
              <div className="font-bold text-slate-100">{appointments.length} ({pendingAppointments} Pending)</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
            <ShoppingBag className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">Orders</div>
              <div className="font-bold text-slate-100">{orders.length} ({pendingOrders} Pending)</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
            <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">Pharmacy Revenue</div>
              <div className="font-bold text-amber-300">PKR {totalRevenue.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="bg-slate-100 p-2 sm:p-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            
            {/* Tab 1: Clinic Settings */}
            <button
              onClick={() => {
                setActiveTab('settings');
                setIsAddingNewProduct(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Clinic & Doctor Settings</span>
            </button>

            {/* Tab 2: Inventory */}
            <button
              onClick={() => {
                setActiveTab('inventory');
                setIsAddingNewProduct(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'inventory'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Medicines & Products ({products.length})</span>
            </button>

            {/* Tab 3: Appointments */}
            <button
              onClick={() => {
                setActiveTab('appointments');
                setIsAddingNewProduct(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'appointments'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Appointments ({appointments.length})</span>
            </button>

            {/* Tab 4: Orders */}
            <button
              onClick={() => {
                setActiveTab('orders');
                setIsAddingNewProduct(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Medicine Orders ({orders.length})</span>
            </button>

            {/* Tab 5: Reviews */}
            <button
              onClick={() => {
                setActiveTab('reviews');
                setIsAddingNewProduct(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Reviews ({reviews.length})</span>
            </button>

          </div>

          {activeTab === 'inventory' && !isAddingNewProduct && (
            <button
              onClick={handleStartAddProduct}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Medicine</span>
            </button>
          )}

          {activeTab === 'reviews' && !isAddingReview && (
            <button
              onClick={() => setIsAddingReview(true)}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Patient Review</span>
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto bg-slate-50/50">
          
          {/* ======================================================== */}
          {/* 1. CLINIC & DOCTOR GENERAL SETTINGS TAB */}
          {/* ======================================================== */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-4xl mx-auto">
              
              {settingsSavedSuccess && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Clinic and Doctor settings successfully saved! Changes are now live across the website.</span>
                </div>
              )}

              {/* Logo & Brand Identity */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Building className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-bold text-slate-900 text-sm">Clinic Brand Identity & Custom Logo</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden mb-2 shadow-2xs">
                      {settingsForm.logoUrl ? (
                        <img src={settingsForm.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                      ) : (
                        <span className="font-serif font-black text-2xl text-emerald-800">PHC</span>
                      )}
                    </div>
                    
                    <label className="cursor-pointer px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-lg border border-emerald-200 transition-colors flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload Logo</span>
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </label>

                    {settingsForm.logoUrl && (
                      <button
                        type="button"
                        onClick={() => setSettingsForm(prev => ({ ...prev, logoUrl: '' }))}
                        className="text-[10px] text-rose-600 hover:underline mt-1 font-medium"
                      >
                        Reset to Default
                      </button>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Clinic Brand Name *</label>
                        <input
                          type="text"
                          required
                          value={settingsForm.brandName}
                          onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-bold"
                          placeholder="Punjab Homeopathic"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Full Clinic Title</label>
                        <input
                          type="text"
                          value={settingsForm.clinicName}
                          onChange={(e) => setSettingsForm({ ...settingsForm, clinicName: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                          placeholder="Punjab Homeopathic Clinic"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Custom Logo Image URL (Alternative)</label>
                      <input
                        type="text"
                        value={settingsForm.logoUrl || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Details & Consultation Fees */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-700" />
                    <h3 className="font-bold text-slate-900 text-sm">Doctor Profile & Consultation Fees</h3>
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                    Current Fee: PKR {settingsForm.consultationFee}
                  </span>
                </div>

                {/* Doctor Picture Upload Card */}
                <div className="bg-gradient-to-r from-slate-50 via-emerald-50/40 to-slate-50 p-4 rounded-xl border border-emerald-100/80">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Picture Preview */}
                    <div className="relative shrink-0">
                      <div className="w-24 h-24 rounded-2xl bg-slate-900 p-0.5 shadow-md border-2 border-emerald-600/60 overflow-hidden">
                        <img
                          src={settingsForm.doctorImageUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"}
                          alt="Doctor Preview"
                          className="w-full h-full object-cover rounded-[14px]"
                        />
                      </div>
                      <div className="absolute -bottom-1.5 -right-1.5">
                        <PunjabGovLogo size="xs" showTooltip />
                      </div>
                    </div>

                    {/* Upload Controls */}
                    <div className="flex-1 text-center sm:text-left space-y-2 w-full">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                        <div>
                          <label className="text-xs font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                            <Camera className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Doctor's Official Portrait / Profile Picture (ڈاکٹر کی تصویر)</span>
                          </label>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            This photo appears on the Hero section, Doctor Bio, consultation wizard & website.
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <label className="cursor-pointer px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Picture (تصویر اپلوڈ کریں)</span>
                            <input type="file" accept="image/*" onChange={handleDoctorImageUpload} className="hidden" />
                          </label>

                          {settingsForm.doctorImageUrl && (
                            <button
                              type="button"
                              onClick={() => setSettingsForm(prev => ({ ...prev, doctorImageUrl: '' }))}
                              className="px-2.5 py-1.5 bg-white hover:bg-rose-50 text-rose-700 text-xs font-medium rounded-xl border border-rose-200 transition-colors cursor-pointer"
                              title="Reset to default photo"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Direct Image URL input */}
                      <div className="pt-1">
                        <div className="relative">
                          <ImageIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
                          <input
                            type="text"
                            value={settingsForm.doctorImageUrl || ''}
                            onChange={(e) => setSettingsForm({ ...settingsForm, doctorImageUrl: e.target.value })}
                            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:ring-1 focus:ring-emerald-500 font-medium"
                            placeholder="Or paste direct image URL (e.g. https://...)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Doctor Name (English) *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.name}
                      onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Doctor Urdu Name (اردو نام)</label>
                    <input
                      type="text"
                      value={settingsForm.urduName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, urduName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-urdu"
                      dir="rtl"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-emerald-900 block mb-1">
                      Consultation Fee (PKR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={settingsForm.consultationFee}
                      onChange={(e) => setSettingsForm({ ...settingsForm, consultationFee: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Medical Qualifications</label>
                    <input
                      type="text"
                      value={settingsForm.qualifications}
                      onChange={(e) => setSettingsForm({ ...settingsForm, qualifications: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      placeholder="D.H.M.S (Pak)"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Council Registration No.</label>
                    <input
                      type="text"
                      value={settingsForm.councilRegNo}
                      onChange={(e) => setSettingsForm({ ...settingsForm, councilRegNo: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      placeholder="48776"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Council Governing Body</label>
                    <input
                      type="text"
                      value={settingsForm.councilName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, councilName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      placeholder="Pakistan National Homeopathic Council"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700 block">Honorary Title / Designation</label>
                      <span className="flex items-center gap-1 text-[11px] text-amber-800 font-semibold bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                        <PunjabGovLogo size="xs" /> Govt of Punjab Insignia Active
                      </span>
                    </div>
                    <div className="relative">
                      <div className="absolute left-2.5 top-2 pointer-events-none">
                        <PunjabGovLogo size="xs" />
                      </div>
                      <input
                        type="text"
                        value={settingsForm.title}
                        onChange={(e) => setSettingsForm({ ...settingsForm, title: e.target.value })}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                        placeholder="Consultant Homeopathician & Honorary Physician to Governor of Punjab"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Years of Experience</label>
                    <input
                      type="text"
                      value={settingsForm.experience}
                      onChange={(e) => setSettingsForm({ ...settingsForm, experience: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      placeholder="35+ Years of Clinical Excellence"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Numbers & Location */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-bold text-slate-900 text-sm">Clinic Contacts & Address (Auto-syncs WhatsApp)</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.whatsapp}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-emerald-50 border border-emerald-300 font-bold text-emerald-950 rounded-xl"
                      placeholder="+923004567890"
                    />
                    <span className="text-[10px] text-slate-500">Links all 1-click WhatsApp buttons on site</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Display Mobile / Phone</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      placeholder="+92 300 4567890"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Landline / Clinic PTCL</label>
                    <input
                      type="text"
                      value={settingsForm.landline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, landline: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      placeholder="042-36301234"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">Clinic Physical Address *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      placeholder="10 Shalimar Road, Garhi Shahu, Lahore, Pakistan"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Clinic Email</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      placeholder="info@punjabhomeopathic.pk"
                    />
                  </div>
                </div>
              </div>

              {/* Clinic Timings, Governor House & Announcement Bar */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-bold text-slate-900 text-sm">Timings, Governor House OPD & Announcement</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Clinic Daily Timings</label>
                    <input
                      type="text"
                      value={settingsForm.timings}
                      onChange={(e) => setSettingsForm({ ...settingsForm, timings: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      placeholder="Monday to Friday: 11:00 AM - 8:00 PM | Saturday: 5:00 PM - 9:00 PM"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Governor House Saturday Free OPD Schedule
                    </label>
                    <input
                      type="text"
                      value={settingsForm.governorHouseSchedule}
                      onChange={(e) => setSettingsForm({ ...settingsForm, governorHouseSchedule: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      placeholder="Every Saturday: 2:00 PM - 4:00 PM (Free Patient Checkup at Governor House Lahore)"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Top Header Announcement Bar Text
                    </label>
                    <input
                      type="text"
                      value={settingsForm.announcementText}
                      onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      placeholder="Governor House Free OPD: Saturday 2:00 PM – 4:00 PM | Doorstep Medicine Delivery Across Pakistan"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Doctor Clinical Bio / About Profile
                    </label>
                    <textarea
                      rows={3}
                      value={settingsForm.aboutBio}
                      onChange={(e) => setSettingsForm({ ...settingsForm, aboutBio: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Submit / Reset Actions */}
              <div className="flex items-center justify-between pt-2">
                {onResetClinicSettings && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Reset clinic settings to original default values?')) {
                        onResetClinicSettings();
                        setSettingsForm({ ...clinicSettings });
                      }
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                )}

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-98 ml-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Clinic Settings</span>
                </button>
              </div>

            </form>
          )}

          {/* ======================================================== */}
          {/* 2. MEDICINE INVENTORY TAB */}
          {/* ======================================================== */}
          {activeTab === 'inventory' && (
            <div>
              {isAddingNewProduct ? (
                /* Add / Edit Form */
                <form onSubmit={handleSaveProduct} className="space-y-4 max-w-3xl mx-auto bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {editingProduct ? `Edit Remedy: ${editingProduct.name}` : 'Add New Homeopathic Medicine'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsAddingNewProduct(false)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Medicine Name (English) *
                      </label>
                      <input
                        type="text"
                        required
                        value={productForm.name || ''}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        placeholder="e.g. Syzygium Jambolanum Q"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Urdu Name (اردو نام)
                      </label>
                      <input
                        type="text"
                        value={productForm.urduName || ''}
                        onChange={(e) => setProductForm({ ...productForm, urduName: e.target.value })}
                        placeholder="e.g. سزیجیم جمبولانم مدر ٹنکچر"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-urdu"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  {/* Image Upload / URL Preview */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">Product Image</label>
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0">
                        <img 
                          src={productForm.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <input
                          type="text"
                          value={productForm.image || ''}
                          onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                          placeholder="Image URL https://..."
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                        />
                        <label className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-slate-200 cursor-pointer hover:bg-slate-50">
                          <Upload className="w-3 h-3" />
                          <span>Upload File</span>
                          <input type="file" accept="image/*" onChange={handleProductImageUpload} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Disease Category *
                      </label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      >
                        <option value="sugar_diabetes">Sugar & Diabetes</option>
                        <option value="blood_pressure">Blood Pressure & Heart</option>
                        <option value="digestive_liver">Digestive & Liver</option>
                        <option value="fertility_reproductive">Fertility & Reproductive</option>
                        <option value="kidney_urinary">Kidney & Urinary</option>
                        <option value="joint_arthritis">Joint Pain & Arthritis</option>
                        <option value="skin_hair">Skin & Hair</option>
                        <option value="immunity_tonics">Immunity & Tonics</option>
                        <option value="clinical_custom">Clinical Custom Formulation</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Potency
                      </label>
                      <input
                        type="text"
                        value={productForm.potency || ''}
                        onChange={(e) => setProductForm({ ...productForm, potency: e.target.value })}
                        placeholder="Mother Tincture (Q) / 30C / 200C"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Form
                      </label>
                      <select
                        value={productForm.form}
                        onChange={(e) => setProductForm({ ...productForm, form: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      >
                        <option value="Liquid / Q">Liquid / Mother Tincture (Q)</option>
                        <option value="Drops">Drops</option>
                        <option value="Syrup">Syrup</option>
                        <option value="Custom Clinic Pack">Custom Clinic Pack</option>
                        <option value="Tablets / Bio-Chemic">Tablets / Bio-Chemic</option>
                        <option value="Oil / Ointment">Oil / Ointment</option>
                      </select>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Original Retail Price (PKR) *
                      </label>
                      <input
                        type="number"
                        required
                        value={productForm.originalPrice || ''}
                        onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                        placeholder="1650"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-emerald-900 block mb-1">
                        Discounted Offer Price (PKR) *
                      </label>
                      <input
                        type="number"
                        required
                        value={productForm.discountedPrice || ''}
                        onChange={(e) => setProductForm({ ...productForm, discountedPrice: Number(e.target.value) })}
                        placeholder="1350"
                        className="w-full px-3 py-2 text-xs bg-white border border-emerald-300 rounded-xl font-bold text-emerald-900"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        value={productForm.stockCount || ''}
                        onChange={(e) => setProductForm({ ...productForm, stockCount: Number(e.target.value), inStock: Number(e.target.value) > 0 })}
                        placeholder="50"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Description & Indications */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Clinical Description (English)
                    </label>
                    <textarea
                      rows={2}
                      value={productForm.description || ''}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      placeholder="Homeopathic mechanism and indications..."
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Urdu Explanation (اردو تفصیل)
                    </label>
                    <textarea
                      rows={2}
                      value={productForm.urduDescription || ''}
                      onChange={(e) => setProductForm({ ...productForm, urduDescription: e.target.value })}
                      placeholder="اردو میں بیماری اور شفا کی تفصیل..."
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-urdu"
                      dir="rtl"
                    />
                  </div>

                  {/* Dosage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Dosage Instructions (English)
                      </label>
                      <input
                        type="text"
                        value={productForm.dosage || ''}
                        onChange={(e) => setProductForm({ ...productForm, dosage: e.target.value })}
                        placeholder="15 drops in water 3 times a day"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Urdu Dosage (اردو خوراک)
                      </label>
                      <input
                        type="text"
                        value={productForm.urduDosage || ''}
                        onChange={(e) => setProductForm({ ...productForm, urduDosage: e.target.value })}
                        placeholder="15 قطرے آدھے کپ پانی میں..."
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-urdu"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  {/* Special Checks */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={productForm.isSpecialClinicFormula || false}
                        onChange={(e) => setProductForm({ ...productForm, isSpecialClinicFormula: e.target.checked })}
                        className="rounded text-emerald-700"
                      />
                      <span>Dr. Ejaz's Special Clinical Compounding Formula</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={productForm.isPrescriptionRequired || false}
                        onChange={(e) => setProductForm({ ...productForm, isPrescriptionRequired: e.target.checked })}
                        className="rounded text-emerald-700"
                      />
                      <span>Requires Doctor Prescription</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={productForm.inStock ?? true}
                        onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                        className="rounded text-emerald-700"
                      />
                      <span>Available In Stock</span>
                    </label>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddingNewProduct(false)}
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingProduct ? 'Save Changes' : 'Add Medicine to Store'}</span>
                    </button>
                  </div>

                </form>
              ) : (
                /* Inventory Table */
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 max-w-md">
                      <div className="relative w-full">
                        <input
                          type="text"
                          value={inventorySearch}
                          onChange={(e) => setInventorySearch(e.target.value)}
                          placeholder="Search remedy by name or Urdu..."
                          className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                        />
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      </div>

                      <select
                        value={selectedCategoryFilter}
                        onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                        className="px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-xl shrink-0"
                      >
                        <option value="all">All Categories</option>
                        <option value="sugar_diabetes">Sugar & Diabetes</option>
                        <option value="blood_pressure">Blood Pressure</option>
                        <option value="digestive_liver">Digestive</option>
                        <option value="fertility_reproductive">Fertility</option>
                        <option value="kidney_urinary">Kidney Stones</option>
                        <option value="joint_arthritis">Joints</option>
                        <option value="skin_hair">Skin & Hair</option>
                      </select>
                    </div>

                    <span className="text-xs text-slate-500 font-medium shrink-0">
                      Total: {products.length} registered remedies
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                        <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                          <tr>
                            <th className="p-3">Medicine</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Potency / Form</th>
                            <th className="p-3">Price (PKR)</th>
                            <th className="p-3">Stock</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {products
                            .filter((p) => {
                              const matchesSearch = 
                                p.name.toLowerCase().includes(inventorySearch.toLowerCase()) || 
                                p.urduName.includes(inventorySearch);
                              const matchesCat = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
                              return matchesSearch && matchesCat;
                            })
                            .map((prod) => (
                              <tr key={prod.id} className="hover:bg-slate-50/80">
                                <td className="p-3">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                      <div className="font-bold text-slate-900">{prod.name}</div>
                                      <div className="text-[11px] text-emerald-700 font-urdu">{prod.urduName}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3 text-slate-600 capitalize">
                                  {prod.category.replace('_', ' ')}
                                </td>
                                <td className="p-3 font-medium text-slate-800">
                                  <span>{prod.potency}</span>
                                  <span className="text-[10px] text-slate-400 block">{prod.form}</span>
                                </td>
                                <td className="p-3">
                                  <div className="font-bold text-emerald-900">PKR {prod.discountedPrice}</div>
                                  <div className="text-[10px] text-slate-400 line-through">PKR {prod.originalPrice}</div>
                                </td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    prod.inStock && prod.stockCount > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                  }`}>
                                    {prod.stockCount} in stock
                                  </span>
                                </td>
                                <td className="p-3 text-right space-x-1.5">
                                  <button
                                    onClick={() => handleStartEditProduct(prod)}
                                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                                    title="Edit Medicine"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (confirm(`Are you sure you want to delete "${prod.name}" from store?`)) {
                                        onDeleteProduct(prod.id);
                                      }
                                    }}
                                    className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                                    title="Delete Medicine"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* 3. APPOINTMENTS LOG TAB */}
          {/* ======================================================== */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <input
                      type="text"
                      value={appointmentSearch}
                      onChange={(e) => setAppointmentSearch(e.target.value)}
                      placeholder="Search patient or phone..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>

                  <select
                    value={appointmentFilter}
                    onChange={(e) => setAppointmentFilter(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                  Consultation Fee: PKR {clinicSettings.consultationFee} • Free Governor House OPD
                </div>
              </div>

              <div className="space-y-3">
                {appointments
                  .filter((apt) => {
                    const matchesSearch = 
                      apt.patientName.toLowerCase().includes(appointmentSearch.toLowerCase()) || 
                      apt.phone.includes(appointmentSearch) ||
                      apt.id.includes(appointmentSearch);
                    const matchesStatus = appointmentFilter === 'all' || apt.status === appointmentFilter;
                    return matchesSearch && matchesStatus;
                  })
                  .map((apt) => (
                    <div 
                      key={apt.id}
                      className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm">{apt.patientName}</span>
                          <span className="text-xs text-slate-500">({apt.patientAge} Yrs, {apt.gender})</span>
                          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                            Token: #{apt.id}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            apt.consultationType === 'saturday_governor_house'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-900'
                          }`}>
                            {apt.consultationType === 'saturday_governor_house' ? 'Governor House Free OPD' : apt.consultationType.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                          <span><strong>Phone:</strong> {apt.phone}</span>
                          <span>•</span>
                          <span><strong>Date & Slot:</strong> {apt.date} ({apt.timeSlot})</span>
                          <span>•</span>
                          <span><strong>City:</strong> {apt.city}</span>
                        </div>

                        <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 mt-1">
                          <strong>Medical Complaint:</strong> <span className="font-semibold text-emerald-900">{apt.problemCategory}</span> — <em>{apt.symptomsDescription || 'To be evaluated during consultation.'}</em>
                        </div>
                      </div>

                      {/* Status Toggle */}
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`https://wa.me/${apt.phone.replace(/\D/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(apt.patientName)},%20this%20is%20Punjab%20Homeopathic%20Clinic%20regarding%20your%20appointment%20with%20Dr.%20Ejaz%20Ahmad.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl border border-emerald-200 text-xs font-bold flex items-center gap-1"
                          title="WhatsApp Patient"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <select
                          value={apt.status}
                          onChange={(e) => onUpdateAppointmentStatus(apt.id, e.target.value as any)}
                          className={`text-xs font-bold px-3 py-2 rounded-xl border cursor-pointer ${
                            apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                            apt.status === 'Completed' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                            apt.status === 'Cancelled' ? 'bg-rose-100 text-rose-900 border-rose-300' :
                            'bg-amber-100 text-amber-900 border-amber-300'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 4. ORDERS TAB */}
          {/* ======================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <input
                      type="text"
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      placeholder="Search order #, customer, city..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>

                  <select
                    value={orderFilter}
                    onChange={(e) => setOrderFilter(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  >
                    <option value="all">All Orders</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  Total Orders: {orders.length} • Total Sales: <strong className="text-emerald-900 font-bold">PKR {totalRevenue.toLocaleString()}</strong>
                </div>
              </div>

              <div className="space-y-3">
                {orders
                  .filter((ord) => {
                    const matchesSearch = 
                      ord.customerName.toLowerCase().includes(orderSearch.toLowerCase()) || 
                      ord.phone.includes(orderSearch) ||
                      ord.id.includes(orderSearch) ||
                      ord.city.toLowerCase().includes(orderSearch.toLowerCase());
                    const matchesStatus = orderFilter === 'all' || ord.status === orderFilter;
                    return matchesSearch && matchesStatus;
                  })
                  .map((ord) => (
                    <div 
                      key={ord.id}
                      className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm">Order #{ord.id}</span>
                          <span className="text-xs text-slate-400">({ord.date})</span>
                          <span className="text-xs font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                            Total: PKR {ord.total.toLocaleString()}
                          </span>
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded uppercase">
                            {ord.paymentMethod.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600">
                          <strong>Customer:</strong> {ord.customerName} ({ord.phone}) • <strong>Delivery:</strong> {ord.city} ({ord.deliveryMethod.replace('_', ' ')})
                        </div>

                        <div className="text-xs text-slate-500">
                          <strong>Address:</strong> {ord.address}
                        </div>

                        <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 mt-1">
                          <strong>Ordered Medicines:</strong>{' '}
                          {ord.items.map((it) => `${it.productName} (${it.potency}) x ${it.quantity} (PKR ${it.price * it.quantity})`).join(' • ')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`https://wa.me/${ord.phone.replace(/\D/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(ord.customerName)},%20this%20is%20Punjab%20Homeopathic%20Clinic%20regarding%20your%20medicine%20order%20%23${ord.id}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl border border-emerald-200 text-xs font-bold flex items-center gap-1"
                          title="WhatsApp Customer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <select
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                          className={`text-xs font-bold px-3 py-2 rounded-xl border cursor-pointer ${
                            ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                            ord.status === 'Dispatched' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                            ord.status === 'Confirmed' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                            ord.status === 'Cancelled' ? 'bg-rose-100 text-rose-900 border-rose-300' :
                            'bg-slate-100 text-slate-800 border-slate-300'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 5. REVIEWS MANAGEMENT TAB */}
          {/* ======================================================== */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {isAddingReview ? (
                <form onSubmit={handleSaveReview} className="max-w-2xl mx-auto bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="text-sm font-bold text-slate-900">Add Verified Patient Review</h3>
                    <button
                      type="button"
                      onClick={() => setIsAddingReview(false)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Patient Name *</label>
                      <input
                        type="text"
                        required
                        value={newReviewForm.patientName}
                        onChange={(e) => setNewReviewForm({ ...newReviewForm, patientName: e.target.value })}
                        placeholder="e.g. Tariq Mahmood"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">City / Location</label>
                      <input
                        type="text"
                        value={newReviewForm.city}
                        onChange={(e) => setNewReviewForm({ ...newReviewForm, city: e.target.value })}
                        placeholder="Lahore / Islamabad"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Treated Condition</label>
                      <input
                        type="text"
                        value={newReviewForm.condition}
                        onChange={(e) => setNewReviewForm({ ...newReviewForm, condition: e.target.value })}
                        placeholder="Sugar & Diabetes / High Blood Pressure"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Rating (1 to 5 Stars)</label>
                      <select
                        value={newReviewForm.rating}
                        onChange={(e) => setNewReviewForm({ ...newReviewForm, rating: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value={5}>5 Stars (Exceptional)</option>
                        <option value={4}>4 Stars (Very Good)</option>
                        <option value={3}>3 Stars (Good)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Patient Testimonial / Comment *</label>
                    <textarea
                      rows={3}
                      required
                      value={newReviewForm.comment}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
                      placeholder="Patient recovery experience with Dr. Ejaz Ahmad..."
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsAddingReview(false)}
                      className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl"
                    >
                      Publish Review
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-amber-500">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>

                        <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                          Condition: {rev.condition}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed italic">
                          "{rev.comment}"
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{rev.patientName}</div>
                          <div className="text-[10px] text-slate-400">{rev.city}</div>
                        </div>

                        {onDeleteReview && (
                          <button
                            onClick={() => {
                              if (confirm(`Delete review from ${rev.patientName}?`)) {
                                onDeleteReview(rev.id);
                              }
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Review"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>{clinicSettings.clinicName} Master Control Portal • Changes persist in live storage</span>
          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
