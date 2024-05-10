import { STATUS } from "../configs/status";

class AppError extends Error {
  statusCode: number;
  status: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = STATUS.FAILURE;
  }
}

export default AppError;
