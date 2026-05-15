import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBYBd6MKtA7M8qRaqIp0oNlHKb4MvqVlhk",
  authDomain: "family-day-3.firebaseapp.com",
  databaseURL: "https://family-day-3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "family-day-3",
  storageBucket: "family-day-3.firebasestorage.app",
  messagingSenderId: "667730142447",
  appId: "1:667730142447:web:96b24a8fd57b1f11f4e71a"
};

// This prevents Next.js from crashing during hot-reloads
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export the Realtime Database instance
const database = getDatabase(app);

export { app, database };