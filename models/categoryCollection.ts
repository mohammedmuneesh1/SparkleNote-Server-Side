import mongoose from "mongoose";
import {CategoryModel} from "../types/categoryInterface";

 const categorySchema = new mongoose.Schema({
    name:{type:String,required:true},
},{
    timestamps:true
 })
 


export const categoryCollection = mongoose.model<CategoryModel>("category",categorySchema)
