import { axiosInstance } from "@/lib/api/axios"
import { API_ENDPOINTS } from "@/lib/api/endpoints"

export const getDepartmentsService = async (role: string) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.DEPARTMENTS.GET_DEPARTMENTS(role))
        console.log(response.data)
        return response.data.data.departments || []
    } catch (error) {
        console.log(error)
        return []
    }
}