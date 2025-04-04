"use client"
import { Instagram, MessageSquare, Phone, Mail, MapPin, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function ContactClient() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4 gradient-text">Contacter un Expert</h1>
          <p className="text-muted-foreground mb-6">
            Besoin de conseils personnalisés sur une voiture d'occasion ? Nos experts sont prêts à vous aider.
            Contactez-nous via WhatsApp, Instagram, ou par téléphone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card flex flex-col items-center justify-center p-8 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors border-blue-200 dark:border-blue-800 shadow-sm hover:shadow"
          >
            <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <MessageSquare className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">WhatsApp</h2>
            <p className="text-center text-muted-foreground mb-6">
              Discutez directement avec nos experts via WhatsApp pour des conseils rapides. Disponible 7j/7 de 9h à 20h.
            </p>
            <Button className="mt-auto bg-green-600 hover:bg-green-700 text-white w-full md:w-auto px-6">
              Ouvrir WhatsApp
            </Button>
          </a>

          <a
            href="https://instagram.com/tomobilti"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card flex flex-col items-center justify-center p-8 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors border-blue-200 dark:border-blue-800 shadow-sm hover:shadow"
          >
            <div className="h-20 w-20 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
              <Instagram className="h-10 w-10 text-pink-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Instagram</h2>
            <p className="text-center text-muted-foreground mb-6">
              Suivez-nous sur Instagram pour des conseils et contactez nos experts via DM. Découvrez aussi nos stories
              avec des astuces quotidiennes.
            </p>
            <Button className="mt-auto bg-pink-600 hover:bg-pink-700 text-white w-full md:w-auto px-6">
              Ouvrir Instagram
            </Button>
          </a>
        </div>

        <div className="bg-gradient-to-r from-blue-600/10 to-red-500/10 rounded-lg p-8 border border-blue-200 dark:border-blue-800 shadow-sm mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center gradient-text">Autres Moyens de Contact</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 hover:bg-white/50 dark:hover:bg-blue-900/5 rounded-lg transition-colors">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">Téléphone</h3>
              <p className="text-muted-foreground">+33 1 23 45 67 89</p>
              <p className="text-xs text-muted-foreground mt-1">Lun-Ven: 9h-18h</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 hover:bg-white/50 dark:hover:bg-blue-900/5 rounded-lg transition-colors">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">Email</h3>
              <p className="text-muted-foreground">contact@tomobilti.fr</p>
              <p className="text-xs text-muted-foreground mt-1">Réponse sous 24h</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 hover:bg-white/50 dark:hover:bg-blue-900/5 rounded-lg transition-colors">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">Adresse</h3>
              <p className="text-muted-foreground">123 Avenue des Voitures</p>
              <p className="text-xs text-muted-foreground mt-1">75001 Paris, France</p>
            </div>
          </div>
        </div>

        <Alert className="mb-4 border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/5 text-sm max-w-lg mx-auto text-center">
          <Info className="h-3 w-3 text-blue-500 dark:text-blue-400 mx-auto mb-1" />
          <AlertDescription className="text-blue-500 dark:text-blue-400 text-xs">
            Les évaluations et conseils fournis sont à titre informatif uniquement. Tomobilti n'est pas responsable ni
            des décisions prises sur la base de ces informations, ni des défauts trouver après l'achat de votre voiture
            !
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}

