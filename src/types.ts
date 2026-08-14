export type ProductCategory = 
  | 'all'
  | 'sugar_diabetes'
  | 'blood_pressure'
  | 'digestive_liver'
  | 'fertility_reproductive'
  | 'kidney_urinary'
  | 'joint_arthritis'
  | 'skin_hair'
  | 'immunity_tonics'
  | 'clinical_custom';

export interface Product {
  id: string;
  name: string;
  urduName: string;
  category: ProductCategory;
  potency: string; // e.g. "Mother Tincture (Q)", "30C", "200C", "6X", "Customised Clinic Formulation"
  form: 'Drops' | 'Liquid / Q' | 'Tablets / Bio-Chemic' | 'Syrup' | 'Custom Clinic Pack' | 'Oil / Ointment';
  originalPrice: number;
  discountedPrice: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isPrescriptionRequired: boolean;
  isSpecialClinicFormula: boolean;
  isFeatured?: boolean;
  badge?: string;
  image: string;
  description: string;
  urduDescription?: string;
  indications: string[];
  composition: string[];
  dosage: string;
  urduDosage?: string;
  benefits: string[];
  packageDetails?: {
    duration: string;
    itemsIncluded: string[];
    freeFollowup: boolean;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPotency?: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  deliveryMethod: 'tcs_express' | 'leopard_courier' | 'lahore_same_day' | 'clinic_pickup';
  paymentMethod: 'cod' | 'jazzcash_easypaisa' | 'bank_transfer' | 'clinic_pay';
  items: {
    productId: string;
    productName: string;
    potency: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled';
  prescriptionAttached?: boolean;
  prescriptionNote?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientAge: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email?: string;
  city: string;
  consultationType: 'online_video' | 'clinic_walkin' | 'saturday_governor_house';
  problemCategory: string;
  symptomsDescription: string;
  fee: number;
  paymentStatus: 'Pending' | 'Paid Online' | 'Pay at Clinic' | 'Free (Governor House OPD)';
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface PrescriptionSubmission {
  id: string;
  date: string;
  patientName: string;
  phone: string;
  city: string;
  address: string;
  illnessHistory: string;
  doctorComments?: string;
  status: 'Under Review' | 'Dispensing' | 'Dispatched';
  fileName?: string;
}

export interface Review {
  id: string;
  patientName: string;
  city: string;
  condition: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ClinicSettings {
  name: string;
  urduName: string;
  qualifications: string;
  councilRegNo: string;
  councilName: string;
  title: string;
  experience: string;
  consultationFee: number;
  clinicName: string;
  brandName: string;
  brandSubtitle: string;
  logoUrl?: string;
  doctorImageUrl?: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  landline: string;
  email: string;
  timings: string;
  governorHouseSchedule: string;
  announcementText: string;
  aboutBio: string;
}
