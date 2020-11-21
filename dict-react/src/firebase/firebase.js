import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyDgeJvtgR1kmyAoFn3gFAc31XnRyL-urO8",
    authDomain: "imagereact-2e887.firebaseapp.com",
    databaseURL: "https://imagereact-2e887.firebaseio.com",
    projectId: "imagereact-2e887",
    storageBucket: "imagereact-2e887.appspot.com",
    messagingSenderId: "852768733850",
    appId: "1:852768733850:web:bb1ec8165b4ccf1419fd23",
    measurementId: "G-VJ23J76D03"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  const storage = firebase.storage()
  export  {
    storage, firebase as default
  }