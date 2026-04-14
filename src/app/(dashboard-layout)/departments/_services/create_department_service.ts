import { axiosInstance } from "@/lib/api/axios"
import { API_ENDPOINTS } from "@/lib/api/endpoints"
import axios, { AxiosError } from "axios"

export const createDepartmentService = async (role: string, data: FormData) => {
    try {
        await axios.get("https://fmappstaging.estatemaster.app/sanctum/csrf-cookie", {
            withCredentials: true
        })
        
        const response = await axiosInstance.post(API_ENDPOINTS.DEPARTMENTS.CREATE_DEPARTMENT(role), data)
        console.log(response.data)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response)
        }
        return []
    }
}