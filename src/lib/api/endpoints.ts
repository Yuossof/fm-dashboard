export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login"
    },
    USERS: {
        DELETE: (id: string) => `/users/${id}`
    }
}