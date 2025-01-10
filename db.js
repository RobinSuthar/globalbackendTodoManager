import dotenv from "dotenv";
import mongoose from "mongoose";
import { boolean } from "zod";

dotenv.config();

const DATBASE_URL = process.env.DATABASE_URL;

async function main() {
  await mongoose.connect(DATBASE_URL);
  console.log("Database is Up and Running");
}

main();

const TodoSchema = new mongoose.Schema(
  {
    type: String,
    username: String,
    title: String,
    description: String,
    isCompleted: Boolean,
  },
  {
    timestamps: true,
  }
);

const TodoDatabase = mongoose.model("Todos", TodoSchema);
