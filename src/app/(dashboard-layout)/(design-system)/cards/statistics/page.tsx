import type { Metadata } from "next"

import { ActiveProjects } from "../../../dashboards/crm/_components/active-projects"
import { ActivityTimeline } from "../../../dashboards/crm/_components/activity-timeline"
import { CustomerSatisfaction } from "../../../dashboards/crm/_components/customer-satisfaction"
import { LeadSources } from "../../../dashboards/crm/_components/lead-sources"
import { Overview } from "../../../dashboards/crm/_components/overview"
import { RevenueTrend } from "../../../dashboards/crm/_components/revenue-trend"
import { SalesByCountry } from "../../../dashboards/crm/_components/sales-by-country"
import { SalesTrend } from "../../../dashboards/crm/_components/sales-trend"
import { TopSalesRepresentatives } from "../../../dashboards/crm/_components/top-sales-representatives"

// Define metadata for the page
// More info: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: "Statistics Cards",
}

export default function StatisticsCardsPage() {
  return (
    <section className="container grid gap-4 p-4 md:grid-cols-2">
      <Overview />
      <SalesTrend />
      <div className="col-span-full grid gap-4 md:grid-cols-4">
        <RevenueTrend />
        <LeadSources />
        <SalesByCountry />
        <TopSalesRepresentatives />
      </div>
      <ActiveProjects />
      <ActivityTimeline />
      <CustomerSatisfaction />
    </section>
  )
}
