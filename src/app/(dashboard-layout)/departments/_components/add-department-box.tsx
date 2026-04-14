import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { BasicFileDropzone } from '@/components/ui/file-dropzone/_components/basic-file-dropzone'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { getIndividualsByDepartmentService } from '@/services/Individuals/departments_Individuals'
import { FileType } from '@/types'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { createDepartmentService } from '../_services/create_department_service'

type Props = {
    isAddDialogOpen: boolean;
    setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddDepartmentBox = ({ isAddDialogOpen, setIsAddDialogOpen }: Props) => {
    const [data, setData] = useState({
        name: "",
        name_ar: "",
        description: "",
        description_ar: ""
    })

    const [departmentImage, setDepartmentImage] = useState<File | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        const formdata = new FormData()
        formdata.append("name", data.name)
        formdata.append("name_ar", data.name_ar)
        formdata.append("description", data.description)
        formdata.append("description_ar", data.description_ar)
        if (departmentImage) {
            formdata.append("image", departmentImage)
        }
        
        try {
            const data = await createDepartmentService("general-manager", formdata)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} >
            <DialogContent className="space-y-6 max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add Department</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}
                        className="space-y-4 px-1">

                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input
                                onChange={handleChange}
                                type="text"
                                name='name'
                                placeholder="Enter department name"
                                className='mt-1'
                            />
                        </div>

                        {/* Name AR */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name (Arabic)</label>
                            <Input
                                onChange={handleChange}
                                type="text"
                                name='name_ar'
                                placeholder="Enter department name (ar)"
                                className='mt-1'
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                                onChange={handleChange}
                                name='description'
                                placeholder="Enter description"
                                className='mt-1'
                            />
                        </div>

                        {/* Description AR */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description (Arabic)</label>
                            <Textarea
                                onChange={handleChange}
                                name='description_ar'
                                placeholder="Enter description (ar)"
                                className='mt-1'
                            />
                        </div>

                        {/* Image */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Department Image</label>
                            <BasicFileDropzone onFileChange={(file) => setDepartmentImage(file)} />
                        </div>

                        <div>
                            <Button onClick={handleSubmit} size="lg" className='w-full flex items-center gap-1.5'>
                                <span className='text-[15px]'>Create</span>

                                <Plus size={20} />
                            </Button>
                        </div>
                    </form>
                </ScrollArea>

            </DialogContent>
        </Dialog>
    )
}

export default AddDepartmentBox