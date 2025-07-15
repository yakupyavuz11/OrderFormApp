import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <-- YENİ: Firestore için getFirestore'u içeri aktarıyoruz

// Firebase web uygulamanızın yapılandırması
// Firebase JS SDK v7.20.0 ve sonrası için measurementId isteğe bağlıdır
const firebaseConfig = {
  apiKey: "AIzaSyDcWfKvWZdbPHb_C0z5geHOfglKEKJJtyG", // API anahtarınızı buraya yapıştırın
  authDomain: "order-form-app-9e995.firebaseapp.com",
  projectId: "order-form-app-9e995",
  storageBucket: "order-form-app-9e995.firebasestorage.app",
  messagingSenderId: "245652434400",
  appId: "1:245652434400:web:67d3adb0b302cabd44cf85",
  measurementId: "G-P0L4FERZXH"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firestore veritabanı servisini alın ve DIŞA AKTARIN
// Bu sayede diğer dosyalardan 'db' nesnesine erişebilirsiniz.
export const db = getFirestore(app); // <-- YENİ: db nesnesini oluşturup dışa aktarıyoruz