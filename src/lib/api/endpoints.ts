export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/dashboard-login"
    },
    USERS: {
        DELETE: (id: string) => `/users/${id}`
    },

    TASKS: {
        GET_TASKS: (role: string) => `/${role}/tasks`,
        GET_TASK: (role: string, id: number) => `/${role}/tasks/${id}`,
    },
    INDIVIDUALS: {
        GET_INDIVIDUALS_BY_DEPARTMENTS: (role: string, id: number) => `/${role}/departments/${id}/individuals`

    },
    DEPARTMENTS: {
        CREATE_DEPARTMENT: (role: string) => `/${role}/departments`,
        GET_DEPARTMENTS: (role: string) => `/${role}/departments`
    }

}