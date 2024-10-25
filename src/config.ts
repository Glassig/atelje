import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_USER = process.env.MONGO_USER || "";
const MONGO_PWD = process.env.MONGO_PWD || "";
const MONGO_DATABASE = process.env.MONGO_DATABASE || "";
const MONGO_URL = process.env.MONGO_URL || "";
const MONGO_OPTIONS: mongoose.ConnectOptions = { retryWrites: true };

export const mongo = {
  MONGO_USER,
  MONGO_PWD,
  MONGO_DATABASE,
  MONGO_URL,
  MONGO_OPTIONS,
  MONGO_CONNECTION: `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_URL}/${MONGO_DATABASE}`,
};
