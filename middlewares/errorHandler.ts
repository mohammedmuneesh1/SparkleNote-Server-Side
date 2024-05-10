import { Request, Response, NextFunction } from "express";
import AppError from "./appError";

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode;
  const status = err.status || "failure";

  res.status(statusCode).json({
    status,
    errorMessage: err.message || "Something went wrong",
  });
};

export default errorHandler;
