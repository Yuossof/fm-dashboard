import type { Metadata } from "next"

import { ActiveProjects } from "../../../dashboards/crm/_components/active-projects"
import { ActivityTimeline } from "../../../dashboards/crm/_components/activity-timeline"
import { CustomerSatisfaction } from "../../../dashboards/crm/_components/customer-satisfaction"
import { LeadSources } from "../../../dashboards/crm/_components/lead-sources"
import { RevenueTrend } from "../../../dashboards/crm/_components/revenue-trend"
import { SalesByCountry } from "../../../dashboards/crm/_components/sales-by-country"
import { SalesTrend } from "../../../dashboards/crm/_components/sales-trend"
import { TopSalesRepresentatives } from "../../../dashboards/crm/_components/top-sales-representatives"

// Define metadata for the page
// More info: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: "Analytics Cards",
}

export default function AnalyticsCardsPage() {
  return (
    <section className="container grid gap-4 p-4 md:grid-cols-2">
      <div className="col-span-full">
        <SalesTrend />
      </div>
      <RevenueTrend />
      <LeadSources />
      <SalesByCountry />
      <TopSalesRepresentatives />
      <ActiveProjects />
      <ActivityTimeline />
      <CustomerSatisfaction />
    </section>
  )
}
