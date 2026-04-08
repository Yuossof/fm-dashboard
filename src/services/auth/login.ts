import { LoginDTO } from "@/dto/user"
import { axiosInstance } from "@/lib/api/axios"
import { API_ENDPOINTS } from "@/lib/api/endpoints"
import { handleApiError } from "@/lib/error/handleApiError"
export const loginService = async (data: LoginDTO) => {
    try {
        await axiosInstance.get("/sanctum/csrf-cookie")
        const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        console.error(error.response?.data);
        console.error(error.response?.headers); 
        handleApiError(error)
    }
}