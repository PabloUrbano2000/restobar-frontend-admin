import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// importaciones necesarias para firestore
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  setDoc,
  query,
  where,
} from "firebase/firestore";

import firebaseConfig from "./config";

class Firebase {
  db: any;
  storage: any;
  insertDocument: Function;
  getDocumentsRealtime: Function;
  getDocumentsQueryRealtime: Function;
  getDocuments: Function;
  updateDocument: Function;
  uploadFile: Function;

  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }

    // inicialización de firestore
    this.db = getFirestore();

    // inicialización de storage
    this.storage = app.storage();

    // añadir un nuevo documento
    this.insertDocument = async function insertDocument(
      coleccion = "",
      cuerpo = {}
    ) {
      const resultado = await addDoc(collection(this.db, coleccion), {
        ...cuerpo,
      });
      return resultado;
    };

    // obtener documentos en tiempo real
    this.getDocumentsRealtime = function getDocumentsRealtime(
      coleccion: string,
      callback: Function
    ) {
      const documentos = collection(this.db, coleccion);
      onSnapshot(documentos, (querySnapshot) => {
        const realtime = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        callback(realtime);
      });
    };

    // obtener documentos con query
    this.getDocumentsQueryRealtime = function getDocumentsQueryRealtime(
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
    };

    // obtener documentos sin tiempo real
    this.getDocuments = async function getDocuments(coleccion: string) {
      const documentos = collection(this.db, coleccion);

      const querySnapshot = await getDocs(documentos);
      let array = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      return array;
    };

    // actualizar documento
    this.updateDocument = async function updateDocument(
      coleccion: string,
      id: string,
      cuerpo: any
    ) {
      const resultado = await setDoc(doc(this.db, coleccion, id), {
        ...cuerpo,
      });
      return resultado;
    };

    // subida de imagen
    this.uploadFile = async function uploadFile(archivo: string) {
      return await this.storage.ref(`${archivo}`).put(archivo);
    };
  }
}

const firebase = new Firebase();
export { Firebase };
export default firebase;
