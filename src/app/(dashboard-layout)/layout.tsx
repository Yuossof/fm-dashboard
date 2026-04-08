import type { ReactNode } from "react"

import { getDictionary } from "@/lib/get-dictionary"

import { Layout } from "@/components/layout"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const dictionary = await getDictionary("en")

  return <Layout dictionary={dictionary}>{children}</Layout>
}
