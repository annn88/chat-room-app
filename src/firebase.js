import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9Si3UAH3-5v1RzINTf2dVQr3RjRyPrrM",
  authDomain: "chat-room-app-2fec4.firebaseapp.com",
  projectId: "chat-room-app-2fec4",
  storageBucket: "chat-room-app-2fec4.firebasestorage.app",
  messagingSenderId: "557345895061",
  appId: "1:557345895061:web:6e551c14898bcc35d7a19c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);