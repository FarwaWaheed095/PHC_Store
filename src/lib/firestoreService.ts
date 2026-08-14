import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';
import { 
  Order, 
  Appointment, 
  Review, 
  PrescriptionSubmission, 
  ClinicSettings 
} from '../types';
import { 
  INITIAL_ORDERS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_REVIEWS, 
  DOCTOR_INFO 
} from '../data/initialData';

// --- ORDERS API ---
export const subscribeOrders = (callback: (orders: Order[]) => void) => {
  try {
    const ordersCol = collection(db, 'orders');
    return onSnapshot(ordersCol, (snapshot) => {
      if (!snapshot.empty) {
        const ordersData = snapshot.docs.map(d => ({
          ...d.data(),
          id: d.id
        })) as Order[];
        ordersData.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        callback(ordersData);
      } else {
        // Safe seed initial orders
        INITIAL_ORDERS.forEach((ord) => {
          setDoc(doc(db, 'orders', ord.id), ord).catch(() => {});
        });
        callback(INITIAL_ORDERS);
      }
    }, (error) => {
      console.warn('Firestore orders sync fallback to local/cached:', error.message || error);
      callback(INITIAL_ORDERS);
    });
  } catch (err) {
    console.warn('Firestore orders init error:', err);
    callback(INITIAL_ORDERS);
    return () => {};
  }
};

export const saveOrderToFirestore = async (order: Order): Promise<string> => {
  try {
    const docRef = doc(db, 'orders', order.id);
    await setDoc(docRef, order);
    return order.id;
  } catch (error) {
    console.error('Error saving order to Firestore:', error);
    // Fallback: save to localStorage
    const saved = localStorage.getItem('punjab_homeo_orders');
    const orders: Order[] = saved ? JSON.parse(saved) : INITIAL_ORDERS;
    localStorage.setItem('punjab_homeo_orders', JSON.stringify([order, ...orders]));
    return order.id;
  }
};

export const updateOrderStatusInFirestore = async (orderId: string, status: Order['status']) => {
  try {
    const docRef = doc(db, 'orders', orderId);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error('Error updating order status in Firestore:', error);
  }
};

// --- APPOINTMENTS API ---
export const subscribeAppointments = (callback: (appointments: Appointment[]) => void) => {
  try {
    const aptsCol = collection(db, 'appointments');
    return onSnapshot(aptsCol, (snapshot) => {
      if (!snapshot.empty) {
        const aptsData = snapshot.docs.map(d => ({
          ...d.data(),
          id: d.id
        })) as Appointment[];
        aptsData.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        callback(aptsData);
      } else {
        INITIAL_APPOINTMENTS.forEach((apt) => {
          setDoc(doc(db, 'appointments', apt.id), apt).catch(() => {});
        });
        callback(INITIAL_APPOINTMENTS);
      }
    }, (error) => {
      console.warn('Firestore appointments sync fallback:', error.message || error);
      callback(INITIAL_APPOINTMENTS);
    });
  } catch (err) {
    console.warn('Firestore appointments init error:', err);
    callback(INITIAL_APPOINTMENTS);
    return () => {};
  }
};

export const saveAppointmentToFirestore = async (appointment: Appointment): Promise<string> => {
  try {
    const docRef = doc(db, 'appointments', appointment.id);
    await setDoc(docRef, appointment);
    return appointment.id;
  } catch (error) {
    console.error('Error saving appointment to Firestore:', error);
    const saved = localStorage.getItem('punjab_homeo_appointments');
    const apts: Appointment[] = saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    localStorage.setItem('punjab_homeo_appointments', JSON.stringify([appointment, ...apts]));
    return appointment.id;
  }
};

export const updateAppointmentStatusInFirestore = async (appointmentId: string, status: Appointment['status']) => {
  try {
    const docRef = doc(db, 'appointments', appointmentId);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error('Error updating appointment in Firestore:', error);
  }
};

// --- REVIEWS API ---
export const subscribeReviews = (callback: (reviews: Review[]) => void) => {
  try {
    const revCol = collection(db, 'reviews');
    return onSnapshot(revCol, (snapshot) => {
      if (!snapshot.empty) {
        const revData = snapshot.docs.map(d => ({
          ...d.data(),
          id: d.id
        })) as Review[];
        callback(revData);
      } else {
        INITIAL_REVIEWS.forEach((rev) => {
          setDoc(doc(db, 'reviews', rev.id), rev).catch(() => {});
        });
        callback(INITIAL_REVIEWS);
      }
    }, (error) => {
      console.warn('Firestore reviews sync fallback:', error.message || error);
      callback(INITIAL_REVIEWS);
    });
  } catch (err) {
    console.warn('Firestore reviews init error:', err);
    callback(INITIAL_REVIEWS);
    return () => {};
  }
};

export const saveReviewToFirestore = async (review: Review) => {
  try {
    const docRef = doc(db, 'reviews', review.id);
    await setDoc(docRef, review);
  } catch (error) {
    console.error('Error saving review to Firestore:', error);
  }
};

// --- PRESCRIPTIONS API ---
export const savePrescriptionToFirestore = async (prescription: PrescriptionSubmission) => {
  try {
    const docRef = doc(db, 'prescriptions', prescription.id);
    await setDoc(docRef, prescription);
  } catch (error) {
    console.error('Error saving prescription to Firestore:', error);
  }
};

export const subscribePrescriptions = (callback: (prescriptions: PrescriptionSubmission[]) => void) => {
  try {
    const presCol = collection(db, 'prescriptions');
    return onSnapshot(presCol, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(d => ({
          ...d.data(),
          id: d.id
        })) as PrescriptionSubmission[];
        callback(data);
      } else {
        callback([]);
      }
    }, (error) => {
      console.warn('Firestore prescription fallback:', error);
      callback([]);
    });
  } catch (err) {
    console.warn('Firestore prescription error:', err);
    callback([]);
    return () => {};
  }
};

// --- CLINIC SETTINGS API ---
export const subscribeClinicSettings = (callback: (settings: ClinicSettings) => void) => {
  try {
    const docRef = doc(db, 'settings', 'clinic');
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as ClinicSettings);
      } else {
        setDoc(docRef, DOCTOR_INFO);
        callback(DOCTOR_INFO);
      }
    }, (error) => {
      console.warn('Firestore settings fallback:', error);
      callback(DOCTOR_INFO);
    });
  } catch (err) {
    console.warn('Firestore settings error:', err);
    callback(DOCTOR_INFO);
    return () => {};
  }
};

export const saveClinicSettingsToFirestore = async (settings: ClinicSettings) => {
  try {
    const docRef = doc(db, 'settings', 'clinic');
    await setDoc(docRef, settings);
  } catch (error) {
    console.error('Error saving clinic settings to Firestore:', error);
  }
};
