import mongoose from "mongoose";
import { NoteModel } from "../types/noteInterface";
 const userSchema = new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String,required:true},
    categoryId:{type:mongoose.Schema.Types.ObjectId,ref:"category"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    isDeleted:{type:Boolean,default:false},
    isCompleted:{type:Boolean, default:false},
 },{
    timestamps:true
 });

 export const noteCollection = mongoose.model<NoteModel>("note",userSchema);