export type Department = {
    id: number;
    name: string;
    image: string;
    created_at: Date;
    updated_at: Date;
}


export type DepartmentDTO = {
    name: string;
    name_ar: string;
    description: string;
    description_ar: string
    image: File;
}