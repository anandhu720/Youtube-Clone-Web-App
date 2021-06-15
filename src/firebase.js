import firebase from 'firebase/app';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOimWFiN331cL3O0uvGqK1VEBpUKTa4fw",
    authDomain: "yt-clone-7.firebaseapp.com",
    projectId: "yt-clone-7",
    storageBucket: "yt-clone-7.appspot.com",
    messagingSenderId: "515268104112",
    appId: "1:515268104112:web:cc59763df0f91b93ec9075",
    measurementId: "G-3391PVHZKK"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.auth();