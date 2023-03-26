import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    // {
    //   title: "Documentation",
    //   href: "/docs",
    // },
  ],
  sidebarNav: [
    {
      title: "Eventos",
      href: "/dashboard",
      icon: "party",
    },
    {
      title: "Planos",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Configurações",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
