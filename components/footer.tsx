import Link from "next/link"
import { Car } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6" />
            <span className="font-bold text-xl gradient-text">Tomobilti</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary" prefetch={true}>
              Accueil
            </Link>
            <Link href="/checklist" className="hover:text-primary" prefetch={true}>
              Liste de Contrôle
            </Link>
            <Link href="/ratings" className="hover:text-primary" prefetch={true}>
              Évaluations
            </Link>
            <Link href="/contact" className="hover:text-primary" prefetch={true}>
              Contact
            </Link>
          </nav>

          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tomobilti. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  )
}

