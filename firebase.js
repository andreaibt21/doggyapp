import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, getDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import React from "react";


// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyBNREgQKZTK4cK__ceUAl4pao66zzknIb0",
    authDomain: "doggyapp-a1e83.firebaseapp.com",
    projectId: "doggyapp-a1e83",
    storageBucket: "doggyapp-a1e83.appspot.com",
    messagingSenderId: "82535282126",
    appId: "1:82535282126:web:2c1c9a01dce3c01ca5279f",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(); //probar con app
