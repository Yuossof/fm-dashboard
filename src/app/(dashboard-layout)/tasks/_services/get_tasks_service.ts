import { axiosInstance } from "@/lib/api/axios"
import { API_ENDPOINTS } from "@/lib/api/endpoints"

export const getTasksService = async (role: string) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.TASKS.GET_TASKS(role))
        console.log(response.data)
        return response.data.data.tasks
    } catch (error) {
        console.log(error)
    }
}

