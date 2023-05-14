import {ArrowDownToLine, ArrowRightToLine, ArrowUpToLine, CheckCircle2, HelpCircle, XCircle,} from "lucide-react"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "UNCONFIRMED",
    label: "Indefinido",
    icon: HelpCircle,
    bgColor: "bg-amber-300 p-1",
  },
  {
    value: "CONFIRMED",
    label: "Confirmado",
    icon: CheckCircle2,
    bgColor: "bg-emerald-300 p-1",
  },
  {
    value: "DECLINED",
    label: "Recusado",
    icon: XCircle,
    bgColor: "bg-red-300 p-1",
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownToLine,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightToLine,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpToLine,
  },
]

