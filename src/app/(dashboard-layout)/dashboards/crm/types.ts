import type { DynamicIconNameType } from "@/types"

export type ActiveProjectStatus = "On Track" | "At Risk" | "On Hold"

export type ActiveProjectType = {
  name: string
  progress: number
  startDate: Date
  dueDate: Date
  status: ActiveProjectStatus
}

export type ActivityTimelineMember = {
  name: string
  avatar: string
  href: string
}

export type ActivityTimelineItemType = {
  type: string
  iconName: DynamicIconNameType
  fill?: string
  title: string
  description: string
  status?: string
  date: string | number | Date
  assignedMembers: ActivityTimelineMember[]
}

export type ActivityTimelineType = {
  period: string
  activities: ActivityTimelineItemType[]
}

export type CustomerSatisfactionSummary = {
  name: string
  value: number
}

export type CustomerSatisfactionFeedback = {
  name: string
  email: string
  avatar: string
  rating: number
  feedbackMessage: string
  createdAt: Date
}

export type CustomerSatisfactionType = {
  period: string
  summary: CustomerSatisfactionSummary
  feedbacks: CustomerSatisfactionFeedback[]
}

export type LeadSourceSummary = {
  totalLeads: number
}

export type LeadSourceLeads = {
  socialMedia: number
  emailCampaigns: number
  referrals: number
  website: number
  other: number
}

export type LeadSourceType = {
  period: string
  summary: LeadSourceSummary
  leads: LeadSourceLeads
}

export type OverviewMetric = {
  period: string
  value: number
  percentageChange: number
}

export type OverviewType = {
  totalSales: OverviewMetric
  totalProfit: OverviewMetric
  revenueGrowth: OverviewMetric
  newCustomers: OverviewMetric
}

export type RevenueTrendSummary = {
  totalRevenue: number
  totalPercentageChange: number
}

export type RevenueTrendMonthly = {
  month: string
  revenue: number
}

export type RevenueTrendType = {
  period: string
  summary: RevenueTrendSummary
  revenueTrends: RevenueTrendMonthly[]
}

export type SalesByCountryItem = {
  countryName: string
  countryCode: string
  sales: number
}

export type SalesByCountryType = {
  period: string
  countries: SalesByCountryItem[]
}

export type SalesTrendSummary = {
  totalLead: number
  totalProposal: number
  totalNegotiation: number
  totalClosed: number
}

export type SalesTrendMonthly = {
  month: string
  lead: number
  proposal: number
  negotiation: number
  closed: number
}

export type SalesTrendType = {
  period: string
  summary: SalesTrendSummary
  monthly: SalesTrendMonthly[]
}

export type SalesRepresentativeItem = {
  name: string
  avatar: string
  sales: number
  email: string
}

export type SalesRepresentativeType = {
  period: string
  representatives: SalesRepresentativeItem[]
}
