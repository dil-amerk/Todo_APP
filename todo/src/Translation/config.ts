import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import entranslation from "./en/translation.json";
import hutranslation from "./hu/translation.json";

export const resources = {
  en: {
    translation: entranslation,
  },
  hu: {
    translation: hutranslation
  }
};

i18next.use(initReactI18next).init({
  lng: "en", 
  debug: true,
  resources,
});
