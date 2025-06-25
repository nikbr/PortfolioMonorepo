"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { I18nextProvider, useTranslation as useI18nextTranslation } from "react-i18next"
import createI18nInstance from "../lib/i18n"

type Language = "en" | "ru"

interface I18nContextType {
  language: Language
  changeLanguage: (lang: Language) => void
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru")
  const [i18nInstance, setI18nInstance] = useState(() => createI18nInstance("ru"))

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ru")) {
      setLanguage(savedLanguage)
      const newInstance = createI18nInstance(savedLanguage)
      setI18nInstance(newInstance)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    const newInstance = createI18nInstance(lang)
    setI18nInstance(newInstance)
  }

  return (
    <I18nContext.Provider value={{ language, changeLanguage }}>
      <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
    </I18nContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within an I18nProvider")
  }
  return context
}

export function useTranslation() {
  return useI18nextTranslation("common")
}
