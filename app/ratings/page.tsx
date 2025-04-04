import type { Metadata } from "next"
import RatingsClient from "./ratings-client"

export const metadata: Metadata = {
  title: "Évaluations",
}

export default function RatingsPage() {
  return <RatingsClient />
}

