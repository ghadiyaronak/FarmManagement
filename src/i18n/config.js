import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    fallbackLng: "ja",
    interpolation: {
        escapeValue: false // not needed for react as it escapes by default
    },
    lng: process.env.REACT_APP_LG,
    resources: {
        ja: {
            translations: require("./locales/ja/translation.json")
        },
        en: {
            translations: require("./locales/en/translation.json")
        }
    },
    ns: ["translations"],
    defaultNS: "translations"
});

export default i18n;
