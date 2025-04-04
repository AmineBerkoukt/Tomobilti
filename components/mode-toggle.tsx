"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Nécessaire pour éviter l'hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="opacity-0">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
      />
      <span className="sr-only">{theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}</span>
    </Button>
  )
}

