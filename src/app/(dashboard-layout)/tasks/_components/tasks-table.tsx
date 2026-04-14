"use client"
import React, { useEffect, useState } from 'react'
import { DataTable } from '../../../../components/ui/data-table'
import { TaskType } from '../types'
import { getTasksService } from '../_services/get_tasks_service'
import { tasksColumns } from './columns'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import AddTaskBox from './add-task-box'

const TasksTable = () => {
    const [data, setData] = useState<TaskType[]>([])
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

    useEffect(() => {
        (async function () {
            try {
                const data = await getTasksService("general-manager")
                setData(data)
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])
    return (
        <div>
            <AddTaskBox />
            <DataTable
                data={data}
                columns={tasksColumns}
                searchColumnId="title"
                searchPlaceholder="Search tasks..."
                showAddButton
                onAddClick={() => setIsAddDialogOpen(true)}
            >
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Task</DialogTitle>
                            <DialogDescription>
                                Plug your task creation form here.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </DataTable>
        </div>
    )
}

export default TasksTable