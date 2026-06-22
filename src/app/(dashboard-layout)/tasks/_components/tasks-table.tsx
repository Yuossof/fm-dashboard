"use client"
import React, { useEffect, useState } from 'react'
import { DataTable } from '../../../../components/ui/data-table'
import { TaskType } from '../types'
import { getTasksService } from '../_services/get_tasks_service'
import { tasksColumns } from './columns'
import AddTaskBox from './add-task-box'

const TasksTable = () => {
    const [data, setData] = useState<TaskType[]>([])
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [totalCount, setTotalCount] = useState<number | null>(null)
    const [isTruncated, setIsTruncated] = useState(false)

    const MAX_TASKS_RENDERED = 500

    useEffect(() => {
        (async function () {
            try {
                const response = await getTasksService("general-manager")
                console.log(response, "rrr")
                const tasks = Array.isArray(response) ? response : []

                setTotalCount(tasks.length)

                if (tasks.length > MAX_TASKS_RENDERED) {
                    setData(tasks.slice(0, MAX_TASKS_RENDERED))
                    setIsTruncated(true)
                } else {
                    setData(tasks)
                    setIsTruncated(false)
                }
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])
    return (
        <div>
            <AddTaskBox
                isAddDialogOpen={isAddDialogOpen}
                setIsAddDialogOpen={setIsAddDialogOpen}
            />
            <DataTable
                data={data}
                columns={tasksColumns}
                searchColumnId="title"
                searchPlaceholder="Search tasks..."
                showAddButton
                onAddClick={() => setIsAddDialogOpen(true)}
            >
                {isTruncated && (
                    <div className="border-b border-border/60 bg-muted/40 px-4 py-2 text-sm text-muted-foreground">
                        Showing the first {MAX_TASKS_RENDERED} of {totalCount ?? 0} tasks. Narrow your search or add pagination for the full list.
                    </div>
                )}
            </DataTable>
        </div>
    )
}

export default TasksTable