import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBeuryFzK_JxBJa-BvzAAW0trP54pvPwS0",
  authDomain: "site-builder-46cfb.firebaseapp.com",
  databaseURL: "https://site-builder-46cfb.firebaseio.com",
  projectId: "site-builder-46cfb",
  storageBucket: "site-builder-46cfb.appspot.com",
  messagingSenderId: "33348700909",
  appId: "1:33348700909:web:694992a74ba24fa3995ae4",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export const subcribeMessagesSocket = (chatId, callback) => {
  db.ref(`/chats/${chatId}`).on("value", (snapshot) => {
    const value = snapshot.val();
    const valueArray = value ? Object.values(value) : [];
    callback(valueArray);
  });
};

// export const postEmptyHistory

export const emitMessage = (chatId, message) => {
  db.ref(`/chats/${chatId}`).push(message);
};
