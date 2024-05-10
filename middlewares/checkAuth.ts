import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import AppError from "./appError";
import { User } from "../types/userInterface";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token || typeof token !== "string") {
      throw new AppError(404, "Token not found.");
    }
    jwt.verify(
      token,
      process.env.USER_SECRET_KEY as string,
      (error: Error | null, decoded: any) => {
        if (error) {
          if (error instanceof TokenExpiredError) {
            throw new AppError(401, "Token expired. Please login again.");
          }
          throw new AppError(401, "Invalid token");
        }

        (req as User).userId = decoded?.userId;
      }
    );
    next();
  } catch (error) {
    next(
      error instanceof AppError
        ? error
        : new AppError(500, (error as Error).message)
    );
  }
};
