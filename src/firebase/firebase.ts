import app from "firebase/compat/app";
import "firebase/compat/firestore";

// importaciones necesarias para firestore
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  Firestore,
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

  // obtener documentos con query
  getDocumentsByFilterInRealtime(
    coleccion: string,
    callback: Function,
    param: string,
    compare: unknown
  ) {
    const q = query(
      collection(this.db, coleccion),
      where(param, "==", compare)
    );
    onSnapshot(q, (querySnapshot) => {
      const realtime = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      callback(realtime);
    });
  }

  // obtener documentos en tiempo real
  getAllDocumentsInRealtime(coleccion: string, callback: Function) {
    const documentos = collection(this.db, coleccion);
    onSnapshot(documentos, (querySnapshot) => {
      const realtime = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      callback(realtime);
    });
  }
}

const firebase = new Firebase();
export { Firebase };
export default firebase;
