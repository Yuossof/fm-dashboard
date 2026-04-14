"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table"


import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { TableToolbar } from "./data-table-toolbar"

interface Props<T> {
  columns?: ColumnDef<T>[]
  data?: T[]
  showAddButton?: boolean
  onAddClick?: () => void
  children?: ReactNode
  searchColumnId?: string
  searchPlaceholder?: string
}
export function DataTable<T>({
  columns = [],
  data = [],
  showAddButton = false,
  onAddClick,
  children,
  searchColumnId = "id",
  searchPlaceholder = "Search...",
}: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,

    state: {
      sorting,
      columnFilters,
    },

    enableSorting: true,
    enableFilters: true,
  })
  return (
    <Card>
      {children}

      <CardHeader className="flex-row justify-between items-center gap-x-1.5 space-y-0">
        <CardTitle>Data Table</CardTitle>
        <TableToolbar
          table={table}
          onAddClick={onAddClick}
          showAddButton={showAddButton}
          searchColumnId={searchColumnId}
          searchPlaceholder={searchPlaceholder}
        />
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea
          orientation="horizontal"
          className="w-[calc(100vw-2.25rem)] md:w-auto"
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer select-none"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={Math.max(columns.length, 1)}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>

      <CardFooter className="block py-3">
        <DataTablePagination table={table} />
      </CardFooter>
    </Card>
  )
}