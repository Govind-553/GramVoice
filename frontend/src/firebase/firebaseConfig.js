// frontend/src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDppTmGCC7YQSyVk-GuAIz_9LwuU9KKEbU",
  authDomain: "gramvoice-5ae15.firebaseapp.com",
  databaseURL: "https://gramvoice-5ae15-default-rtdb.firebaseio.com/",
  projectId: "gramvoice-5ae15",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push };
