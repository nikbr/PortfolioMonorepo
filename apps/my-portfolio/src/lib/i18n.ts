import { createInstance } from "i18next"
import { initReactI18next } from "react-i18next"
import enCommon from "../../public/locales/en/common.json"
import ruCommon from "../../public/locales/ru/common.json"

const resources = {
  en: {
    common: enCommon,
  },
  ru: {
    common: ruCommon,
  },
}

const createI18nInstance = (lng = "ru") => {
  const i18nInstance = createInstance()

  i18nInstance.use(initReactI18next).init({
    lng,
    fallbackLng: "ru",
    debug: false,
    resources,
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  })

  return i18nInstance
}

export default createI18nInstance
