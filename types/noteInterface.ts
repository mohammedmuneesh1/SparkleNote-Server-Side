import { Document,Schema } from "mongoose";

export interface NoteModel extends Document{
    title: string;
    content: string;
    categoryId: Schema.Types.ObjectId;
    userId?:Schema.Types.ObjectId;
    isDeleted: boolean;
    isCompleted: boolean;
}

export interface CreateNote {
    title:string,
    content:string,
    category:string,
}

export interface EditNote{
    title?:string,
    content?:string,
    category?:string,
}

export interface NoteQuery {
    userId:string,
    categoryId?:string,
        isCompleted?:boolean,
        isDeleted?:boolean,
}