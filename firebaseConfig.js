// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importar getAuth correctamente
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMCWpsXl1HS6MRnWCM5uY2tPjEsnSKGxY",
  authDomain: "appjuli-bcf1f.firebaseapp.com",
  databaseURL: "https://appjuli-bcf1f-default-rtdb.firebaseio.com",
  projectId: "appjuli-bcf1f",
  storageBucket: "appjuli-bcf1f.firebasestorage.app",
  messagingSenderId: "1080920898394",
  appId: "1:1080920898394:web:9cfd5c8a1218977eea9163"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene y exporta la instancia de auth
const auth = getAuth(app);

export { auth };
export default app;