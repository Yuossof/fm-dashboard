  import axios from "axios";
  import { ApiError } from "./apiError";

  type ApiErrorResponse =
    | {
        message?: string;
        error?: string;
        success?: boolean;
      }
    | {
        errors?: string[];
      }
    | string;

  export function handleApiError(error: unknown): ApiError {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const data = error.response?.data;
      const status = error.response?.status;

      if (typeof data === "string") {
        return new ApiError(data, status);
      }

      if (data && typeof data === "object") {
        if ("errors" in data && Array.isArray(data.errors)) {
          return new ApiError(data.errors.join(", "), status);
        }

        if ("message" in data || "error" in data) {
          return new ApiError(
            data.message ?? data.error ?? "Request failed",
            status
          );
        }
      }

      return new ApiError(error.message, status);
    }

    if (error instanceof Error) {
      return new ApiError(error.message);
    }

    return new ApiError("Unexpected error");
  }
