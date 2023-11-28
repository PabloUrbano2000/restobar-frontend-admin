import { createContext } from "react";
import { Firebase } from "./firebase";

const FirebaseContext = createContext<{ firebase: Firebase | null }>({
  firebase: null,
});

export default FirebaseContext;
