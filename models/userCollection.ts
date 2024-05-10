import mongoose from "mongoose";
import { UserModel } from "../types/userInterface";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const userCollection = mongoose.model<UserModel>("user", userSchema);
