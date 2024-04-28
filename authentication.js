// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjwFFynUyr8f7ogiKgNnl9moE707Rodi8",
  authDomain: "lab4-519bd.firebaseapp.com",
  projectId: "lab4-519bd",
  storageBucket: "lab4-519bd.appspot.com",
  messagingSenderId: "404399796081",
  appId: "1:404399796081:web:efb17986ddf13d5d1010d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");
const form = document.querySelector("#form");

const userSignIn = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          document.getElementById('firstName').value = user.displayName.split(' ')[0];
          document.getElementById('lastName').value = user.displayName.split(' ')[1];
          document.getElementById('exampleInputEmail1').value = user.email;
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Authentication failed: ${errorMessage}`);
      });
  };
  
  const userSignOut = async () => {
    signOut(auth)
      .then(() => {
        alert("You have been signed out!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Sign out failed: ${errorMessage}`);
      });
  };
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      alert("You are authenticated with Google");
      console.log(user);
    }
  });
  
  signInButton.addEventListener("click", userSignIn);
  signOutButton.addEventListener("click", userSignOut);
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("exampleInputEmail1").value.trim();
  
    if (firstName === "" || lastName === "" || email === "") {
      alert("Please fill in all required fields.");
      return;
    }
  
    alert("Form submitted successfully!");
  });