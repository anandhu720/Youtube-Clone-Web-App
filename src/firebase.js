import firebase from 'firebase/app';
import 'firebase/auth';

//ADD YOUR FIREBASE APP SDK
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "****************",
    authDomain: "*****************",
    projectId: "yt-clone-7",
    storageBucket: "*************",
    messagingSenderId:*********************,
    appId: "*******************",
    measurementId: "*********************"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.auth();
