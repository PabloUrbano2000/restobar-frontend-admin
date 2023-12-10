import app from "firebase/compat/app";
import "firebase/compat/firestore";

// importaciones necesarias para firestore
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  Firestore,
  limit,
} from "firebase/firestore";

import firebaseConfig from "./config";

class Firebase {
  db: Firestore;

  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }

    // inicialización de firestore
    this.db = getFirestore();
  }

  listenDocumentsUpdateInRealtime(coleccion: string, callback: Function) {
    const q = query(collection(this.db, coleccion), limit(100));
    onSnapshot(q, () => callback());
  }
}

const firebase = new Firebase();
export { Firebase };
export default firebase;
