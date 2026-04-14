"use client"

import { EllipsisVertical } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import type { Row } from "@tanstack/react-table"
import type { TaskType } from "../types"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { TaskDetailsBox } from "./task-details-box"

interface TableRowAction<TData> {
    row: Row<TData>
}

export function TasksTableRowActions<TData>({
    row,
}: TableRowAction<TData>) {
    const [open, setOpen] = useState(false)

    const _task = row.original as TaskType

    return (
        <div className="flex justify-end me-4">
            <AnimatePresence>
                {open && (
                    <div className="bg-black/50 fixed top-0 left-0 bottom-0 right-0 z-50">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-1/4 left-1/2 -translate-x-1/2 lg:w-1/3 md:1/2 w-9/10"
                        >
                            <TaskDetailsBox onClose={() => setOpen(false)} taskID={_task.id as number} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 p-0.5"
                        aria-label="Open actions"
                    >
                        <EllipsisVertical className="size-max" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem onClick={() => setOpen(true)}>Show</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
