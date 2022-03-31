import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import authRouter from "./router/auth-router.js";
import reportRouter from "./router/report-router.js";
import errorMiddleware from "./middleware/error-middleware.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/api/auth", authRouter);
app.use("/api/report", reportRouter);
app.use(errorMiddleware);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://user:${process.env.DB_PASSWORD}@cluster0.n8m1x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.log(`Server is down`);
  }
}

start();
