import type { Metadata } from "next"
import ChecklistClientPage from "./ChecklistClientPage"

export const metadata: Metadata = {
  title: "Liste de Contrôle",
}

export default function ChecklistPage() {
  return <ChecklistClientPage />
}

