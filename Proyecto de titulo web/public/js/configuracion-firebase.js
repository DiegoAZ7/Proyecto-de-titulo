// configuracion de firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDuEK6Sx20oIZfuLhZUBtXssWQ4VjWg-uM",
  authDomain: "redwave-8c1d3.firebaseapp.com",
  projectId: "redwave-8c1d3",
  storageBucket: "redwave-8c1d3.appspot.com",
  messagingSenderId: "680176915246",
  appId: "1:680176915246:web:f033148e42e46d382c60bf",
  measurementId: "G-R1L6HV0P3L"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { doc, setDoc, getDoc };
