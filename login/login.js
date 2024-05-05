import { app, db } from "/firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const registerForm = document.getElementById("login-form");
const loginGoogleBtn = document.getElementById("login-google-btn");

const auth = getAuth();

registerForm.onsubmit = function (event) {
  event.preventDefault();
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmpassword = document.getElementById("password");

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      alert("dang nhap thanh cong");
      window.location.href = "/admin";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

loginGoogleBtn.onclick = function () {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      alert("dang nhap thanh cong");
      window.location.href = "/";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      alert(errorMessage);
    });
};
