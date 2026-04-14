import axios from "axios";
import Cookies from "js-cookie";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en",
    "X-Requested-With": "XMLHttpRequest"

  },
});


axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});