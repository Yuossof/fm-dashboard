import { axiosInstance } from "@/lib/api/axios"
import { API_ENDPOINTS } from "@/lib/api/endpoints"

export const getTaskService = async (role: string, id: number) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.TASKS.GET_TASK(role, id))
        console.log(response.data)
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}