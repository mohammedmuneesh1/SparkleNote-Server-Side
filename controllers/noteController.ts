import { Request, Response } from "express";
import AppError from "../middlewares/appError";
import { STATUS } from "../configs/status";
import { categoryCollection } from "../models/categoryCollection";
import { noteCollection } from "../models/noteCollection";
import { CreateNote, EditNote, NoteQuery } from "../types/noteInterface";
import { User } from "../types/userInterface";


//-----------------------------------------------------------------CREATE NEW CATEGORY--------------------------------------------------------------
export  async function createCategory(req:Request,res:Response):Promise<Response>{
    let name:string = req.body.categoryName;
    await categoryCollection.create({name})
   return  res.status(200).json({status:STATUS.SUCCESS,message:'New Category Created Successfully.'})   
}

//--------------------------------------------------------------------GET ALL CATEGORY-------------------------------------------------------------
export  async function getCategory(req:Request,res:Response):Promise<Response>{
    const data = await categoryCollection.find({}).select("-__v -createdAt -updatedAt")
    return  res.status(200).json({status:STATUS.SUCCESS,message:'Category retrieved successfully.',data})   
 }
//--------------------------------------------------------------------CREATE NOTE-------------------------------------------------------------
export  async function createNote(req:Request,res:Response):Promise<Response>{
    const userId = (req as User).userId;
    const obj:CreateNote = req.body;
    await noteCollection.create({...obj,userId})
    return  res.status(201).json({status:STATUS.SUCCESS,message:'New note has been created successfully.'})   
 }
//--------------------------------------------------------------------GET NOTE-------------------------------------------------------------
 export  async function getNotes(req:Request,res:Response):Promise<Response>{
     const pageNum = +(req.query.page || 1);
    const userId= (req as User).userId;
    const query:NoteQuery = {userId,isDeleted:false,isCompleted:false}
    if(req.query.category){
        query.categoryId = req.query.category as string;
    }
    if(req.query.completed === 'true'){
        query.isCompleted = true;
    }
    const data = await noteCollection.find(query).populate({
        path:"categoryId",
        select:"id name",
    }).select("-isDeleted  -__v")
    .skip((pageNum - 1) * 9)
    .limit(9);
    return  res.status(200).json({status:STATUS.SUCCESS,message:'Note Retrieved Successfully.',data})   
 }   
//--------------------------------------------------------------------GET NOTE BY CATEGORY-------------------------------------------------------------
 export async function getNotesByCategory(req:Request,res:Response):Promise<Response>{
    const userId = (req as User).userId;
    const {categoryId} = req.params;
    const data = await noteCollection.find({userId,categoryId,isDeleted:false,isCompleted:false}).populate({
        path:"categoryId",
        select:"id name",
    }).select("-isDeleted -isCompleted -__v");
    return  res.status(200).json({status:STATUS.SUCCESS,message:' Successfully retrieved note by category.',data})   

 }
 //----------------------------------------------------------------DELETE NOTE----------------------------------------------------------
export  async function deleteNote(req:Request,res:Response):Promise<Response>{
    const id =req.params.noteId;
    await noteCollection.findByIdAndUpdate(id,{isDeleted:true});
    return  res.status(200).json({status:STATUS.SUCCESS,message:'Successfully deleted the note.'})   
 }
//----------------------------------------------------------------MARK NOTE COMPLETED--------------------------------------------------------
export  async function markNoteCompleted(req:Request,res:Response):Promise<Response>{
    const id =req.params.noteId;
    await noteCollection.findByIdAndUpdate(id,{isCompleted:true});
    return  res.status(200).json({status:STATUS.SUCCESS,message:'Successfully marked note as completed.'})   
 }


//----------------------------------------------------------------MOVE COMPLETED NOTE TO UNCOMPLETED--------------------------------------------------------
export  async function markNoteUncompleted(req:Request,res:Response):Promise<Response>{
    const id =req.params.noteId;
    await noteCollection.findByIdAndUpdate(id,{isCompleted:false});
    return  res.status(200).json({status:STATUS.SUCCESS,message:'Successfully moved not to uncompleted.'})   
 }






//----------------------------------------------------------------GET COMPLETED NOTES--------------------------------------------------------
export  async function getAllCompletedNotes(req:Request,res:Response):Promise<Response>{
    const userId = (req as User).userId;
    const data = await noteCollection.find({userId,isDeleted:false,isCompleted:true}).populate({
        path:"categoryId",
        select:"id name",
    }).select("-isDeleted -isCompleted -__v");
    return  res.status(200).json({status:STATUS.SUCCESS,message:'Successfully retrieved completed task note',data})   
 }
//----------------------------------------------------------------GET COMPLETED NOTES--------------------------------------------------------
export async function editNote(req:Request,res:Response):Promise<Response>{
    const id = req.params.noteId;
    const obj:EditNote = req.body;
    await noteCollection.findByIdAndUpdate(id,obj);
    return  res.status(200).json({status:STATUS.SUCCESS,message:'Successfully edited the note.'})   
}
 
 






// export  async function createCategory(req:Request,res:Response):Promise<Response>{
//     return  res.status(200).json({status:STATUS.SUCCESS,message:'New Category Created Successfully.'})   
//  }
 

