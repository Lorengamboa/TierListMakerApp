import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import englishI18N from "./en";
import frenchI18N from "./fr";
import spanishI18N from "./es";

/**
 * 
 * @param {*} lng 
 */
export default function initializeI18(lng) {
  const languageDetector = {
    type: "languageDetector",
    async: true,
    detect: cb => cb(lng),
    init: () => {},
    cacheUserLanguage: () => {}
  };

  i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      debug: false,
      resources: {
        en: englishI18N,
        es: spanishI18N,
        fr: frenchI18N
      }
    });
}
