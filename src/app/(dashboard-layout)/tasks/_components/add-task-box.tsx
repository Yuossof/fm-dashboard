"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { getIndividualsByDepartmentService } from '@/services/Individuals/departments_Individuals'

type Props = {
    isAddDialogOpen: boolean
    setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type IndividualOption = {
    id?: number
    name?: string
    phone?: string | null
    avatar?: string | null
    user?: {
        id?: number
        name?: string
        phone?: string | null
        avatar?: string | null
    }
}

type FormState = {
    title: string
    description: string
    dueDate: string
    departmentId: string
    assigneeId: string
}

function normalizeIndividuals(response: unknown): IndividualOption[] {
    if (!response || typeof response !== 'object') {
        return []
    }

    const payload = response as {
        data?: {
            individuals?: IndividualOption[]
            data?: IndividualOption[]
        }
        individuals?: IndividualOption[]
        data?: IndividualOption[]
    }

    const list = payload.data?.individuals ?? payload.data?.data ?? payload.individuals ?? payload.data ?? []

    return Array.isArray(list) ? list : []
}

const AddTaskBox = ({ isAddDialogOpen, setIsAddDialogOpen }: Props) => {
    const [form, setForm] = useState<FormState>({
        title: '',
        description: '',
        dueDate: '',
        departmentId: '2',
        assigneeId: '',
    })
    const [individuals, setIndividuals] = useState<IndividualOption[]>([])
    const [isLoadingIndividuals, setIsLoadingIndividuals] = useState(false)

    useEffect(() => {
        if (!isAddDialogOpen) {
            return
        }

        let isActive = true

        ;(async function loadIndividuals() {
            try {
                setIsLoadingIndividuals(true)
                const response = await getIndividualsByDepartmentService(
                    'general-manager',
                    Number(form.departmentId)
                )

                console.log(response, "r1")

                if (!isActive) {
                    return
                }

                setIndividuals(normalizeIndividuals(response))
            } catch (error) {
                console.log(error)
            } finally {
                if (isActive) {
                    setIsLoadingIndividuals(false)
                }
            }
        })()

        return () => {
            isActive = false
        }
    }, [isAddDialogOpen, form.departmentId])

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target

        setForm((current) => ({
            ...current,
            [name]: value,
        }))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Task payload', form)
        setIsAddDialogOpen(false)
    }

    return (
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogDescription>
                        Create a task and assign it to a department member.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[72vh] pr-3">
                    <form onSubmit={handleSubmit} className="space-y-4 px-1 pb-1">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Enter task description"
                                className="min-h-28"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Due date</label>
                                <Input
                                    name="dueDate"
                                    type="datetime-local"
                                    value={form.dueDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Department ID</label>
                                <Input
                                    name="departmentId"
                                    type="number"
                                    min="1"
                                    value={form.departmentId}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Assign to</label>
                            <select
                                name="assigneeId"
                                value={form.assigneeId}
                                onChange={(event) =>
                                    setForm((current) => ({
                                        ...current,
                                        assigneeId: event.target.value,
                                    }))
                                }
                                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="">Select a member</option>
                                {individuals.map((individual) => {
                                    const id = individual.id ?? individual.user?.id
                                    const name = individual.name ?? individual.user?.name ?? `Member ${id ?? ''}`

                                    return (
                                        <option key={id ?? name} value={id ?? ''}>
                                            {name}
                                        </option>
                                    )
                                })}
                            </select>
                            <p className="text-xs text-muted-foreground">
                                {isLoadingIndividuals
                                    ? 'Loading department members...'
                                    : 'Members load only when this dialog opens.'}
                            </p>
                        </div>

                        <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
                            <p className="mb-2 text-sm font-medium">Available members</p>
                            <div className="max-h-40 space-y-1 overflow-auto pr-1 text-sm text-muted-foreground">
                                {individuals.length ? (
                                    individuals.map((individual) => {
                                        const id = individual.id ?? individual.user?.id
                                        const name = individual.name ?? individual.user?.name ?? 'Unnamed member'

                                        return (
                                            <div
                                                key={id ?? name}
                                                className="flex items-center justify-between rounded-md border border-border/40 bg-background px-3 py-2"
                                            >
                                                <span>{name}</span>
                                                {id != null && <span className="text-xs">#{id}</span>}
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p>{isLoadingIndividuals ? 'Loading...' : 'No members found.'}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Create task</Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default AddTaskBox