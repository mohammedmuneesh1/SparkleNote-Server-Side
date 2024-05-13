import { Request } from "express";
import { Document, Schema } from "mongoose";

export interface UserModel extends Document {
  name: string;
  password: string;
  email: string;
}

export interface User extends Request {
  userId: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface RegisterInterface {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  isVerified: boolean;
}

export interface tokenData {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
  updatedAt?: Date;
}
