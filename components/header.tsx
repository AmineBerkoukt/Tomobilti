"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Car } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Nécessaire pour éviter l'hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const routes = [
    { href: "/", label: "Accueil" },
    { href: "/checklist", label: "Liste de Contrôle" },
    { href: "/ratings", label: "Évaluations" },
    { href: "/contact", label: "Contact" },
  ]

  // Précharger les pages pour une navigation plus rapide
  useEffect(() => {
    // Précharger toutes les routes principales
    routes.forEach((route) => {
      const prefetchRoute = async () => {
        await router.prefetch(route.href)
      }
      prefetchRoute()
    })
  }, [router])

  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
          
          <Link href="/" className="flex items-center gap-2" prefetch={true}>
            <Car className="h-6 w-6" />
            <span className="font-bold text-xl gradient-text">Tomobilti</span>
          </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              prefetch={true}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === route.href ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
          <ModeToggle />
        </nav>

        {/* Mobile navigation */}
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isMenuOpen ? "hidden" : "block"}
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isMenuOpen ? "block" : "hidden"}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                prefetch={true}
                className={`text-sm font-medium py-2 transition-colors hover:text-primary ${
                  pathname === route.href ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

