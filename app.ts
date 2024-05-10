import dotenv from 'dotenv';
dotenv.config();
import express,{ Express } from "express";
import { connectDB } from './configs/db';
import { router as Note } from './routes/noteRoute';
import { router as User  } from './routes/userRoute';
import cors from "cors";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import erroHandler from "./middlewares/errorHandler"

export const app:Express= express();

const Port = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10 
});



connectDB();
app.use(cors());
app.use(helmet());
app.use(express.json({limit:"10mb"}));
app.use(limiter);

app.use("/api/user",User)
app.use("/api/note",Note)
app.use(erroHandler);



app.listen(Port,()=>{
  console.log("running successfully",Port)
})


  



