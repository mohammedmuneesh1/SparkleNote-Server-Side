import { Request, Response } from "express";
import AppError from "../middlewares/appError";
import { STATUS } from "../configs/status";
import { userCollection } from "../models/userCollection";
import bcrypt from "bcrypt";
import { tokenCollection } from "../models/tokenCollection";
import crypto from "crypto";
import { sendMail } from "../helpers/sendMail";
import {
  LoginData,
  RegisterInterface,
  tokenData,
} from "../types/userInterface";
import jwt from "jsonwebtoken";

//-----------------------------------------USER REGISTRATION---------------------------------------------------------------
export async function userRegistration(
  req: Request,
  res: Response
): Promise<Response> {
  let obj: RegisterInterface = req.body;
  const isUserAlreadyExist = await userCollection
    .findOne({ email: obj.email })
    .select("email -_id");
  if (isUserAlreadyExist) {
    throw new AppError(409, "user alreadyregistered with this email");
  }
  const salt = await bcrypt.genSalt(10);
  obj.password = await bcrypt.hash(obj.password, salt);
  const userData = await userCollection.create(obj);
  const userId = userData._id.toString();
  const tokenInfo = await tokenCollection.create({
    userId,
    token: crypto.randomBytes(32).toString("hex"),
  });
  const url = `${process.env.APP_URL}/user/${tokenInfo.userId}/account/${tokenInfo.token}/verify`;
  await sendMail(userData.name, userData.email, url);
  return res.status(201).json({
    status: "success",
    message:
      "Account Registered Successfully. A Mail has been sent to given email. Verify your email.",
  });
}

//-----------------------------------------USER LOGIN---------------------------------------------------------------
export async function userLogin(
  req: Request,
  res: Response
): Promise<Response> {
  const { email, password } = req.body;
  const user: LoginData | null = await userCollection
    .findOne({ email })
    .select("-__v -updatedAt -createdAt");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError(404, "Email/Password is Invalid");
  }
  if (!user.isVerified) {
    const tokenInfo =
      (await tokenCollection.findOne({ userId: user._id })) ||
      (await tokenCollection.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }));
    const url = `${process.env.APP_URL}/user/${user._id}/account/${tokenInfo.token}/verify`;
    await sendMail(user.name, user.email, url);
    return res.status(201).json({
      status: "Success",
      message:
        "Verification Mail has been sent to your account. Please verify your account",
    });
  }
  const token = jwt.sign(
    { userId: user._id },
    process.env.USER_SECRET_KEY as string,
    { expiresIn: "7d" }
  );
  return res.status(200).json({
    status: STATUS.SUCCESS,
    message: "user login successfully.",
    token,
  });
}

//-----------------------------------------USER VERIFICATION---------------------------------------------------------------
export async function userVerification(
  req: Request,
  res: Response
): Promise<Response> {
  const { userId, token } = req.params;
  const validate: tokenData | null = await tokenCollection.findOne({
    _id: token,
    userId,
  });
  if (validate) {
    const timeDifference =
      (new Date().getTime() - new Date(validate.createdAt).getTime()) /
      (1000 * 60);
    if (timeDifference > 10) {
      await tokenCollection.deleteOne({ _id: token, userId });
      throw new AppError(
        410,
        "This link has been expired.login again for verification email."
      );
    }
    await userCollection.findByIdAndUpdate(userId, { isVerified: true });
    await tokenCollection.deleteOne({ _id: token, userId });
    return res.status(200).json({
      status: "Success",
      messsage: "Verification has been Successfull",
    });
  }
  throw new AppError(400, "Invalid URL. try again");
}

// //==========================================USER VERIFICATION==============================================================
// async function userVerify(req, res) {
//     const {userId,token} = req.params;
//     const validate = await tokenCollection.findOne({userId,token});
//     if(validate){
//       const timeDifference = (new Date() - validate.createdAt) / (1000 * 60);
//       if(timeDifference>5){
//          await tokenCollection.deleteOne({userId,token})
//          return res.status(410).json({status:"Failure",message:'This link has been expired.login again for verification email.'})
//       }
//       await userCollection.findByIdAndUpdate(userId, { $set: { isVerified: true } });
//       await tokenCollection.deleteOne({userId,token})
//       return res.status(200).json({status:"Success",messsage:"Verification has been Successfull"})
//     }
//      return res.status(400).json({status:"Failure",message:'Invalid URL. try again'})
//   }
