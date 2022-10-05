import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb8JHYgBFmjlKGSLWHJvW88XvhsZgxgbc",
  authDomain: "todolist-f3b03.firebaseapp.com",
  projectId: "todolist-f3b03",
  storageBucket: "todolist-f3b03.appspot.com",
  messagingSenderId: "711994400424",
  appId: "1:711994400424:web:8489c79064fc9b8270ec9d",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
