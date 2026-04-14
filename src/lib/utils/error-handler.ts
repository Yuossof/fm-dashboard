export class AppError extends Error {
    statusCode?: number;

    constructor(message: string, statusCode?: number) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
    }
}

type ApiErrorResponse = {
    message?: string;
    error?: string;
    status_code?: number;
};

export function throwError(error: unknown): never {
    if (typeof error === "object" && error !== null) {
        const err = error as any;

        // Axios / API error
        if (err.response?.data) {
            const data: ApiErrorResponse = err.response.data;

            throw new AppError(
                data.message || data.error || "Server error",
                data.status_code
            );
        }

        if (err.message) {
            throw new AppError(err.message);
        }
    }

    throw new AppError("Unexpected error occurred");
}