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
            console.log("MESSAGE:", error.message);
            console.log("CODE:", error.code);

            console.log("CONFIG:", error.config);

            console.log("REQUEST:", error.request);

            console.log("RESPONSE:", error.response);

            if (error.response) {
                console.log("STATUS:", error.response.status);
                console.log("DATA:", error.response.data);
                console.log("HEADERS:", error.response.headers);
            }
        }

        throw error;
    }
}