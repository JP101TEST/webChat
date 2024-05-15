// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAntAHsvT84eBW6jbyNCMWlufhT8nVmcEI",
    authDomain: "webchat-bec16.firebaseapp.com",
    projectId: "webchat-bec16",
    storageBucket: "webchat-bec16.appspot.com",
    messagingSenderId: "335937079093",
    appId: "1:335937079093:web:d0d8fe2a4ed50eb276ae7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth();
auth.languageCode = 'it';
const provider = new GoogleAuthProvider();
const googleLogin = document.getElementById("googleSignInButton");

googleLogin.addEventListener("click", async function () {
    console.log("Click login button");
    signInWithPopup(auth, provider)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // console.log("User: ", user);
            // console.log("User displayName: ", "google-" + user.displayName);
            // console.log("User email: ", "google-" + user.email);

            //console.log("User id: ", "firebaseAuth@" + user.uid);
            //const originalString = "firebaseAuth@" + user.displayName;
            //const parts = originalString.split('-');

            // Extract the second part of the split string
            //const extractedString = parts.length > 1 ? parts[1].trim() : '';
            //console.log(extractedString); // Output: "ชนกานต์ คําพิลา"

            const data = {
                username: "firebaseAuth@" + removeSpaces(user.displayName),
                password: "firebaseAuth@" + user.uid,
                email: "firebaseAuth@" + user.email
            };

            const response = await fetch('http://localhost:8000/loginRegister/login/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const resultFromResponse = await response.json();

            sessionStorage.setItem("login", true);
            sessionStorage.setItem("googleLogin", true);
            sessionStorage.setItem("userId", resultFromResponse.userId)
            sessionStorage.setItem("username", data.username)
            sessionStorage.setItem("email", data.email)
            sessionStorage.setItem("image", resultFromResponse.image)
            //console.log(data);
            location.href = "/";
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error code:", errorCode);
            console.error("Error message:", errorMessage);
        });
});

function removeSpaces(inputString) {
    // Use the replace method with a regular expression to remove spaces
    return inputString.replace(/\s/g, '');
}

