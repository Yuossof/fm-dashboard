"use client"

import type { Table } from "@tanstack/react-table"

import { Input } from "@/components/ui/input"
import { TableViewOptions } from "./data-table-view-options"
import { Button } from "../button"
import { Plus } from "lucide-react"

interface TableToolbarProps<TTable> {
  table: Table<TTable>
  onAddClick?: () => void
  showAddButton: boolean
  searchColumnId: string
  searchPlaceholder?: string
}

export function TableToolbar<TTable>({
  table,
  onAddClick,
  showAddButton,
  searchColumnId,
  searchPlaceholder = "Search...",
}: TableToolbarProps<TTable>) {
  const searchColumn = table.getColumn(searchColumnId)

  return (
    <div className="flex gap-x-1.5">
      <TableViewOptions table={table} />
      <Input
        placeholder={searchPlaceholder}
        className="border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        value={(searchColumn?.getFilterValue() as string) ?? ""}
        onChange={(event) => searchColumn?.setFilterValue(event.target.value)}
      />

      {showAddButton && (
        <Button onClick={onAddClick}>
          <Plus />
        </Button>
      )}

    </div>
  )
}
