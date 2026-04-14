import { TUser } from "@/types/user";

type Assignee = {
    company_user_id: number;
    department_id: number;
    working_days: string;
    shift_start: string;
    shift_end: string;

    company_user: {
        user: TUser
    }
}

type Department = {
    name: string;
    created_at: Date;
    updated_at: Date
}

export type TaskType = {
    id: number;
    title: string;
    description: string;
    status: string;
    due_date: Date;
    created_at: Date;
    updated_at: Date;


    assignee: Assignee;

    department: Department
}