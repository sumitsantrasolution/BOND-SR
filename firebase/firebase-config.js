import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  getStorage
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

import {
  getDatabase
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbH6axEkR127PTFt0IM1VRoLA4xJh-Uow",
  authDomain: "bond-rs.firebaseapp.com",
  projectId: "bond-rs",
  storageBucket: "bond-rs.firebasestorage.app",
  messagingSenderId: "224682992857",
  appId: "1:224682992857:web:6e4946b905606217758ac8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDB = getDatabase(app);

console.log("Firebase Connected");
