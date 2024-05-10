import mongoose from "mongoose";
import { TokenModel } from "../types/tokenInterface";

const verifyTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      user: "user",
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const tokenCollection = mongoose.model<TokenModel>(
  "token",
  verifyTokenSchema
);
