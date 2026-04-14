"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { Department } from "../types"

import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header"
import { DepartmentTableRowActions } from "./table-row-actions"

export const tasksColumns: ColumnDef<Department>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                className="ms-4"
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                className="ms-4"
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => {
            const id = row.getValue("id") as string

            return <span className="text-primary">#{id}</span>
        },
    },

    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            const name = row.getValue("name") as string

            return <span>{name}</span>
        },
    },
    {
        accessorKey: "image",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Task" />
        ),
        cell: ({ row }) => {
            const img = row.getValue("image") as string
            if (!img) return <span>-</span>

            const isDataUri = img.startsWith("data:image")

            if (isDataUri) {
                return <span className="text-muted-foreground">Embedded image</span>
            }

            return (
                <img
                    src={img}
                    alt="Department"
                    className="h-8 w-8 rounded object-cover"
                    loading="lazy"
                />
            )
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => {
            const dueDate = row.getValue("created_at") as string

            const date = new Date(dueDate)

            const created_at = date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })

            return <span>{created_at}</span>
        },
    },
    {
        accessorKey: "updated_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Updated At" />
        ),
        cell: ({ row }) => {
            const dueDate = row.getValue("updated_at") as string

            const date = new Date(dueDate)

            const updated_at = date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })

            return <span>{updated_at}</span>
        },
    },


    {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => <DepartmentTableRowActions row={row} />,
    },
]
