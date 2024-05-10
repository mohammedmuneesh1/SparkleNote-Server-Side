import { Request,Response,NextFunction } from "express"
import { RequestHandler } from "express";
import AppError from "./appError";
export function tryCatch(codeBlock:RequestHandler ){
    return async (req:Request,res:Response,next:NextFunction)=>{
        try{
            await codeBlock(req,res,next);
        }
        catch(error){
            next(
                error instanceof AppError
                  ? error
                  : new AppError(500, (error as Error).message),
              );
        }
    }
}






