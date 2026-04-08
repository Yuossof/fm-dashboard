import type { Metadata } from "next"

import CRMPage from "./dashboards/crm/page"

export const metadata: Metadata = {
  title: "CRM",
}

export default function HomePage() {
  return <CRMPage />
}
