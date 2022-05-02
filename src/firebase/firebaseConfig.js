import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDvaiS1yfsy5uUcKK-tRNsB6jy4bIrF-8o',
  authDomain: 'vue-firebase-a4dbd.firebaseapp.com',
  projectId: 'vue-firebase-a4dbd',
  storageBucket: 'vue-firebase-a4dbd.appspot.com',
  messagingSenderId: '444051290270',
  appId: '1:444051290270:web:6fb3fe6bb0087a9e20a38f',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
