import { LAST_PATH } from "./constants";
import { isStorageAvailable } from "./storage";

export const generateLastPath = () => {
  if (isStorageAvailable("sessionStorage")) {
    sessionStorage.setItem(LAST_PATH, window.location.pathname);
  }
};

export const changeTitleDOM = (title: string) => {
  if (typeof window !== "undefined") {
    window.document.title = `LabBio | ${title}`;
  }
};
