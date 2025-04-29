import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCEDW0eiKfwHLvZwZNdx-H7Ro_Pjg4WdIo",
  authDomain: "growfit-888a7.firebaseapp.com",
  projectId: "growfit-888a7",
  storageBucket: "growfit-888a7.firebasestorage.app",
  messagingSenderId: "717952217499",
  appId: "1:717952217499:web:47dc2cc4a533505d32713e",
  measurementId: "G-22LK1TC1L9"
};

console.log('Initializing Firebase with config:', {
  apiKey: firebaseConfig.apiKey ? 'set' : 'missing',
  authDomain: firebaseConfig.authDomain ? 'set' : 'missing',
  projectId: firebaseConfig.projectId ? 'set' : 'missing',
  storageBucket: firebaseConfig.storageBucket ? 'set' : 'missing',
  messagingSenderId: firebaseConfig.messagingSenderId ? 'set' : 'missing',
  appId: firebaseConfig.appId ? 'set' : 'missing',
  measurementId: firebaseConfig.measurementId ? 'set' : 'missing'
});

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log('Firebase Auth initialized:', auth ? 'success' : 'failed');

export { auth };
export const analytics = getAnalytics(app);
export default app;
