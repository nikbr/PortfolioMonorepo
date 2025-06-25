"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/i18n-context"

export function LanguageToggle() {
  const { language, changeLanguage } = useLanguage()

  return (
    <div className="flex gap-1 border rounded-md p-1 bg-background">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => changeLanguage("en")}
        className="h-7 px-2 text-xs font-medium"
      >
        EN
      </Button>
      <Button
        variant={language === "ru" ? "default" : "ghost"}
        size="sm"
        onClick={() => changeLanguage("ru")}
        className="h-7 px-2 text-xs font-medium"
      >
        RU
      </Button>
    </div>
  )
}
