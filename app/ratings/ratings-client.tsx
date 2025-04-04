"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, AlertTriangle, Search, SlidersHorizontal, X, Filter, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import carsData from "@/data/cars.json"

type Car = {
  id: string
  name: string
  brand: string
  year: number
  expertRating: number
  communityRating: number
  commonIssues: string[]
  comments: {
    name: string
    rating: number
    comment: string
  }[]
}

export default function RatingsClient() {
  const [cars, setCars] = useState<Car[]>(carsData)
  const [filteredCars, setFilteredCars] = useState<Car[]>(carsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("name-asc")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")

  // Get unique brands for filter
  const brands = ["all", ...Array.from(new Set(cars.map((car) => car.brand)))]

  useEffect(() => {
    let result = [...cars]

    // Apply brand filter
    if (selectedBrand !== "all") {
      result = result.filter((car) => car.brand === selectedBrand)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((car) => {
        const fullName = `${car.brand} ${car.name}`.toLowerCase()
        return (
          fullName.includes(query) || car.name.toLowerCase().includes(query) || car.brand.toLowerCase().includes(query)
        )
      })
    }

    // Apply sorting
    switch (sortOption) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "rating-desc":
        result.sort((a, b) => b.expertRating - a.expertRating)
        break
      case "rating-asc":
        result.sort((a, b) => a.expertRating - b.expertRating)
        break
      case "year-desc":
        result.sort((a, b) => b.year - a.year)
        break
      case "year-asc":
        result.sort((a, b) => a.year - b.year)
        break
    }

    setFilteredCars(result)
  }, [cars, searchQuery, sortOption, selectedBrand])

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-blue-500 fill-blue-500" : "text-gray-300"}`} />
      ))
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4 gradient-text">Évaluations & Problèmes Courants</h1>
          <p className="text-muted-foreground">
            Consultez les évaluations d'experts et les problèmes courants pour les modèles de voitures d'occasion
            populaires.
          </p>
        </div>

        <Alert className="mb-6 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-900/10 shadow-sm">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-300 font-medium">Avis de non-responsabilité</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-400">
            Bien que nos experts possèdent des compétences avancées, ils peuvent commettre des erreurs. Les évaluations
            et conseils fournis sont à titre informatif uniquement. Tomobilti n'est pas responsable des décisions prises
            sur la base de ces informations, ni des défauts trouvés après l'achat de votre voiture !
          </AlertDescription>
        </Alert>

        <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par marque ou modèle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-10 border-blue-200 dark:border-blue-800 focus-visible:ring-blue-500"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-blue-600" />
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-[150px] border-blue-200 dark:border-blue-800">
                  <SelectValue placeholder="Marque" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les marques</SelectItem>
                  {brands
                    .filter((b) => b !== "all")
                    .map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-blue-600" />
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px] border-blue-200 dark:border-blue-800">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
                  <SelectItem value="rating-desc">Note (Haute-Basse)</SelectItem>
                  <SelectItem value="rating-asc">Note (Basse-Haute)</SelectItem>
                  <SelectItem value="year-desc">Année (Récente)</SelectItem>
                  <SelectItem value="year-asc">Année (Ancienne)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(searchQuery || selectedBrand !== "all") && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm text-muted-foreground">Filtres actifs:</span>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge
                    variant="outline"
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800"
                  >
                    Recherche: {searchQuery}
                    <button onClick={clearSearch} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedBrand !== "all" && (
                  <Badge
                    variant="outline"
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800"
                  >
                    Marque: {selectedBrand}
                    <button onClick={() => setSelectedBrand("all")} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {filteredCars.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <AlertTriangle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucune voiture trouvée</h3>
            <p className="text-muted-foreground mb-4">Essayez de modifier vos critères de recherche.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedBrand("all")
              }}
              className="gradient-border"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredCars.map((car) => (
              <Card key={car.id} className="car-card overflow-hidden border-blue-200 dark:border-blue-800">
                <CardHeader className="bg-blue-50 dark:bg-blue-900/10 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="mb-2">
                        <span className="year-badge inline-block">{car.year}</span>
                      </div>
                      <CardTitle className="flex items-center gap-2">
                        {car.brand} {car.name}
                      </CardTitle>
                      <CardDescription>ID: {car.id}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-sm font-medium">Expert:</span>
                        <div className="flex">{renderStars(car.expertRating)}</div>
                        <span className="ml-1 text-sm font-bold">{car.expertRating}/5</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium flex items-center mb-3">
                      <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                      Problèmes Courants
                    </h3>
                    <ul className="space-y-2 pl-6 list-disc">
                      {car.commonIssues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

