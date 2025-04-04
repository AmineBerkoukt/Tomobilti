import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, CheckCircle, Shield, PenToolIcon as Tool } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tomobilti | Accueil",
}

export default function Home() {
  return (
    <main>
      <section className="hero-section text-white py-24 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Évaluez les Voitures d'Occasion en Toute Confiance
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Tomobilti vous aide à prendre des décisions éclairées lors de l'achat d'une voiture d'occasion
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button size="lg" className="gradient-button" asChild>
                <Link href="/checklist" prefetch={true}>
                  Commencer la Vérification <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
                asChild
              >
                <Link href="/ratings" prefetch={true}>
                  Voir les Évaluations <Star className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50 dark:bg-blue-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Comment Tomobilti Vous Aide</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Notre plateforme vous offre tous les outils nécessaires pour évaluer une voiture d'occasion comme un
              professionnel
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm">
              <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Listes de Contrôle Interactives</h3>
              <p className="text-muted-foreground mb-4">
                Guides étape par étape avec vidéos pour vous aider à inspecter minutieusement n'importe quelle voiture
                d'occasion.
              </p>
              <Button variant="outline" className="mt-auto gradient-border" asChild>
                <Link href="/checklist" prefetch={true}>
                  Voir les Listes
                </Link>
              </Button>
            </div>

            <div className="feature-card flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm">
              <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Évaluations & Problèmes</h3>
              <p className="text-muted-foreground mb-4">
                Consultez les problèmes courants et les évaluations de fiabilité pour les modèles de voitures d'occasion
                populaires.
              </p>
              <Button variant="outline" className="mt-auto gradient-border" asChild>
                <Link href="/ratings" prefetch={true}>
                  Voir les Évaluations
                </Link>
              </Button>
            </div>

            <div className="feature-card flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm">
              <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Tool className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conseils d'Experts</h3>
              <p className="text-muted-foreground mb-4">
                Connectez-vous avec des experts automobiles via WhatsApp ou Instagram pour des conseils personnalisés.
              </p>
              <Button variant="outline" className="mt-auto gradient-border" asChild>
                <Link href="/contact" prefetch={true}>
                  Contacter les Experts
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Pourquoi Choisir Tomobilti?</h2>
            <p className="text-lg text-muted-foreground mb-10">
              Notre plateforme a été conçue par des experts automobiles pour vous aider à éviter les mauvaises surprises
            </p>

            <div className="grid gap-6">
              <div className="flex items-start gap-4 text-left">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Expertise Professionnelle</h3>
                  <p className="text-muted-foreground">
                    Nos listes de contrôle et conseils sont développés par des mécaniciens et experts automobiles
                    certifiés.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Économisez de l'Argent</h3>
                  <p className="text-muted-foreground">
                    Évitez les réparations coûteuses en identifiant les problèmes potentiels avant l'achat.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Facile à Utiliser</h3>
                  <p className="text-muted-foreground">
                    Interface intuitive avec des explications claires et des vidéos éducatives pour chaque point de
                    contrôle.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Button className="gradient-button" size="lg" asChild>
                <Link href="/checklist" prefetch={true}>
                  Commencer Maintenant <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

