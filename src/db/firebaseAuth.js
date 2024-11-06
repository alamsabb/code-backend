const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const firebaseConfig = {
  apiKey: "AIzaSyBtwncxTgJnyFh2rrfiCw4-7cmt0m5a2io",
  authDomain: "assignment-cd15d.firebaseapp.com",
  projectId: "assignment-cd15d",
  storageBucket: "assignment-cd15d.firebasestorage.app",
  messagingSenderId: "492512419894",
  appId: "1:492512419894:web:67acba677be8f368cef897",
  measurementId: "G-MH3QD62ETW",
};
const firebaseapp = initializeApp(firebaseConfig);
module.exports = firebaseapp;
