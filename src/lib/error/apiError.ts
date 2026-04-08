export class ApiError extends Error {
  success: false;
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.success = false;
    this.status = status;
  }
}
