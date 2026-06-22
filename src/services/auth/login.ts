import axios from "axios"

import { LoginDTO } from "@/dto/user"
import { axiosInstance } from "@/lib/api/axios"
import { API_ENDPOINTS } from "@/lib/api/endpoints"
import { handleApiError } from "@/lib/error/handleApiError"
export const loginService = async (data: LoginDTO) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data)
        console.log(response, "RES")
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error, "axios errror")
            console.error(error.response?.data)
            console.error(error.response?.headers)
        }
        handleApiError(error)
    }
}