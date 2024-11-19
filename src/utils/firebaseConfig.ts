// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBw7nqD2wtagq7VPFo85u5GUW4N9YUdNuE",
    authDomain: "whatsup-ccfc3.firebaseapp.com",
    projectId: "whatsup-ccfc3",
    storageBucket: "whatsup-ccfc3.firebasestorage.app",
    messagingSenderId: "367991985402",
    appId: "1:367991985402:web:e306cf9ab395db9704a543",
    measurementId: "G-5REH0XV9Z6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const fireAuth = getAuth(app);
