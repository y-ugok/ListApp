const firebaseConfig = {
  apiKey: "AIzaSyDgKDONAuDfmZBiKGrHe4mbfAK9dfP5DcA",
  authDomain: "listapp-7e716.firebaseapp.com",
  projectId: "listapp-7e716",
  storageBucket: "listapp-7e716.firebasestorage.app",
  messagingSenderId: "805257599242",
  appId: "1:805257599242:web:1d85c44918e3040f54c2f3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
