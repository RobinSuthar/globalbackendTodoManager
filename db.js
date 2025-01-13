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

const UserSchema = new mongoose.Schema(
  {
    username: String,
  },
  {
    timestamps: true,
  }
);

const OrganizationSchema = new mongoose.Schema(
  {
    name: String,
    Pin: String,
  },
  {
    timestamps: true,
  }
);

const ComopanySchema = new mongoose.Schema(
  {
    name: String,
    author: String,
    title: String,
    description: String,
    importance: Number,
    tag: String,
  },
  {
    timestamps: true,
  }
);

const TodoDatabase = mongoose.model("Todos", TodoSchema);

const UserDatabase = mongoose.model("Users", UserSchema);

const OrganizationDatabase = mongoose.model("Organzitions", OrganizationSchema);

const CompanyDatbase = mongoose.model("CompanyTodo", ComopanySchema);

export { TodoDatabase, UserDatabase, OrganizationDatabase, CompanyDatbase };
