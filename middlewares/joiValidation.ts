import { Err, Schema } from "joi";
import { NextFunction, Request,Response } from "express";
import { STATUS } from "../configs/status";
import AppError from "./appError";
export  function joiValidation(schema:Schema){
    return async function (req:Request,res:Response,next:NextFunction){
        try {
            const validatedData = await schema.validateAsync(req.body);
            req.body = validatedData;
            next();
            
        }catch (error) {
            next(new AppError(400,(error as Error).message));
        }
    }
}