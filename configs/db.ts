import mongoose from "mongoose";
import AppError from "../middlewares/appError";
export function connectDB() {
  const dbUrl = process.env.DB_URL;
  if (!dbUrl) {
    throw new AppError(500, "database url missing");
  }

  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log(" connected to database successfully.");
      mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
      });
      mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected.");
      });
    })
    .catch((error) => {
      console.error("Error occurred while connecting database:", error);
      throw new AppError(500,"Error occurred while connecting database");
     });
}
