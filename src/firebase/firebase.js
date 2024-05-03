// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4u00K32zj-8DqWvyxYz5lgkPQlT08evo",
    authDomain: "e-commerce-123c8.firebaseapp.com",
    projectId: "e-commerce-123c8",
    storageBucket: "e-commerce-123c8.appspot.com",
    messagingSenderId: "740629238234",
    appId: "1:740629238234:web:867d601282952a565430e3",
    measurementId: "G-9NR7BH9141"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export { app, auth }