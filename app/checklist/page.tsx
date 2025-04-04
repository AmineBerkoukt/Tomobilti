"use client"

import { useState, useEffect, useMemo } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Video, CheckCircle2 } from "lucide-react"
import checklistData from "@/data/checklist.json"

type ChecklistItem = {
  label: string
  description: string
  video: string
}

type ChecklistCategory = {
  [key: string]: ChecklistItem[]
}

type CheckedState = {
  [key: string]: {
    [key: string]: boolean
  }
}

export default function ChecklistPage() {
  const [checkedState, setCheckedState] = useState<CheckedState>({})
  const [progress, setProgress] = useState(0)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Traduire les catégories - mémorisé pour éviter des recalculs inutiles
  const translateCategory = useMemo(() => {
    const translations: { [key: string]: string } = {
      engine: "Moteur",
      body: "Carrosserie",
      interior: "Intérieur",
      chassis: "Châssis",
      brakes: "Freins",
      suspension: "Suspension",
      testDrive: "Essai Routier",
    }

    return (category: string): string => translations[category] || category
  }, [])

  // Load saved progress from localStorage on component mount
  useEffect(() => {
    setIsLoading(true)
    try {
      const savedProgress = localStorage.getItem("checklist-progress")
      if (savedProgress) {
        setCheckedState(JSON.parse(savedProgress))
      } else {
        // Initialize empty checked state
        const initialState: CheckedState = {}
        Object.keys(checklistData).forEach((category) => {
          initialState[category] = {}
          checklistData[category as keyof typeof checklistData].forEach((item, index) => {
            initialState[category][index] = false
          })
        })
        setCheckedState(initialState)
      }

      // Set first category as active by default
      if (Object.keys(checklistData).length > 0) {
        setActiveCategory(Object.keys(checklistData)[0])
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Calculate progress whenever checkedState changes - optimisé avec useMemo
  const calculatedProgress = useMemo(() => {
    if (Object.keys(checkedState).length === 0) return 0

    let totalItems = 0
    let checkedItems = 0

    Object.keys(checkedState).forEach((category) => {
      Object.keys(checkedState[category]).forEach((itemIndex) => {
        totalItems++
        if (checkedState[category][itemIndex]) {
          checkedItems++
        }
      })
    })

    return totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0
  }, [checkedState])

  // Mettre à jour le progress et sauvegarder dans localStorage
  useEffect(() => {
    if (Object.keys(checkedState).length === 0) return

    setProgress(calculatedProgress)
    localStorage.setItem("checklist-progress", JSON.stringify(checkedState))
  }, [checkedState, calculatedProgress])

  const handleCheckChange = (category: string, itemIndex: string, checked: boolean) => {
    setCheckedState((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [itemIndex]: checked,
      },
    }))
  }

  const resetProgress = () => {
    const initialState: CheckedState = {}
    Object.keys(checklistData).forEach((category) => {
      initialState[category] = {}
      checklistData[category as keyof typeof checklistData].forEach((_, index) => {
        initialState[category][index] = false
      })
    })
    setCheckedState(initialState)
    localStorage.removeItem("checklist-progress")
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement de la liste de contrôle...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4 gradient-text">Liste de Contrôle pour Voitures d'Occasion</h1>
          <p className="text-muted-foreground mb-6">
            Utilisez cette liste de contrôle interactive pour inspecter minutieusement n'importe quelle voiture
            d'occasion avant l'achat. Cochez les éléments au fur et à mesure pour suivre votre progression.
          </p>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span>Votre progression</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3 bg-gray-100 dark:bg-gray-800">
              <div
                className="h-full progress-gradient rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </Progress>

            {progress === 100 && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>Félicitations ! Vous avez complété toute la liste de contrôle.</span>
              </div>
            )}
          </div>

          <Button variant="outline" onClick={resetProgress} className="mb-4 gradient-border">
            Réinitialiser la Progression
          </Button>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full"
          value={activeCategory || undefined}
          onValueChange={(value) => setActiveCategory(value)}
        >
          {Object.entries(checklistData as ChecklistCategory).map(([category, items]) => (
            <AccordionItem key={category} value={category} className="border rounded-lg mb-4 overflow-hidden">
              <AccordionTrigger className="text-lg font-medium capitalize px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/10">
                <div className="flex items-center gap-2">
                  {translateCategory(category)}
                  {Object.values(checkedState[category] || {}).every(Boolean) &&
                    Object.values(checkedState[category] || {}).length > 0 && (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2 px-4 pb-4">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className={`checklist-item border rounded-lg p-4 ${
                        checkedState[category]?.[index]
                          ? "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`${category}-${index}`}
                          checked={checkedState[category]?.[index] || false}
                          onCheckedChange={(checked) => handleCheckChange(category, index.toString(), checked === true)}
                          className="mt-1 border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                        />
                        <div className="grid gap-1.5 leading-none">
                          <div className="flex items-center">
                            <Label htmlFor={`${category}-${index}`} className="text-base font-medium">
                              {item.label}
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 w-fit gradient-border"
                              >
                                <Video className="h-4 w-4" />
                                Voir la vidéo
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>{item.label}</DialogTitle>
                                <DialogDescription>{item.description}</DialogDescription>
                              </DialogHeader>
                              <div className="aspect-video mt-2">
                                <iframe
                                  src={item.video}
                                  className="w-full h-full rounded-md"
                                  title={item.label}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

