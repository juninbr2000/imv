import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAU5zyvXAkBkQ2ZaOYV56GcH9hFlrdy6YI",
  authDomain: "imoveisgentil-bef5b.firebaseapp.com",
  projectId: "imoveisgentil-bef5b",
  storageBucket: "imoveisgentil-bef5b.appspot.com",
  messagingSenderId: "530596864954",
  appId: "1:530596864954:web:fd9828e9fa44f44b4df383",
  measurementId: "G-YZXGR9QT0L"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const storageService = getStorage(app);

export { db, storageService }