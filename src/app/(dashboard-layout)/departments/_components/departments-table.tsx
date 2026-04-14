"use client"
import React, { useEffect, useState } from 'react'
import { DataTable } from '../../../../components/ui/data-table'
import { Department } from '../types'
import { getDepartmentsService } from '../_services/get_departments_service'
import { tasksColumns } from './columns'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import AddDepartmentBox from './add-department-box'
// import AddTaskBox from './add-task-box'

const DepartmentsTable = () => {
    const [data, setData] = useState<Department[]>([])
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

    useEffect(() => {
        (async function () {
            try {
                const data = await getDepartmentsService("general-manager")
                setData(data)
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])
    return (
        <div>
            <DataTable
                data={data}
                columns={tasksColumns}
                searchColumnId="name"
                searchPlaceholder="Search departments..."
                showAddButton
                onAddClick={() => setIsAddDialogOpen(true)}
            >
                <AddDepartmentBox isAddDialogOpen={isAddDialogOpen} setIsAddDialogOpen={setIsAddDialogOpen} />
            </DataTable>
        </div>
    )
}

export default DepartmentsTable