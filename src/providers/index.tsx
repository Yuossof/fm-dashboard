import type { DirectionType } from "@/types"
import type { ReactNode } from "react"

import { SettingsProvider } from "@/contexts/settings-context"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DirectionProvider } from "./direction-provider"
import { ModeProvider } from "./mode-provider"
import { ThemeProvider } from "./theme-provider"

export function Providers({
  direction,
  children,
}: Readonly<{
  direction: DirectionType
  children: ReactNode
}>) {
  return (
    <SettingsProvider>
      <ModeProvider>
        <ThemeProvider>
          <DirectionProvider direction={direction}>
            <SidebarProvider>{children}</SidebarProvider>
          </DirectionProvider>
        </ThemeProvider>
      </ModeProvider>
    </SettingsProvider>
  )
}
