import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getIndividualsByDepartmentService } from '@/services/Individuals/departments_Individuals'
import React, { useEffect, useState } from 'react'

const AddTaskBox = () => {
    const [departmentsWithIndividuals, setDepartmentsWithIndividuals] = useState([])
    useEffect(() => {
        (async function () {
            try {
                const data = await getIndividualsByDepartmentService("general-manager", 2)
            } catch (error) {
                console.log(error)
            }
        }())
    }, [])
    return (
        // <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <Dialog>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogContent>

                    </DialogContent>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddTaskBox