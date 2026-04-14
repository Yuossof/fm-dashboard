import { axiosInstance } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { AxiosError } from "axios";

export const getIndividualsByDepartmentService = async (role: string, id: number) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.INDIVIDUALS.GET_INDIVIDUALS_BY_DEPARTMENTS(role, id))
        console.log(response.data)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response)
        }
        console.log(error)
    }
}