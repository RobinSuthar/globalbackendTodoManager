import express from "express";
import dotenv from "dotenv";
import TodoDatabase from "./db.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT;
app.get("/GlobalTodos/AllTodos", async function (req, res) {
  //some logic to retrive all todos which type is global
  const allTodosWithGlobalType = await TodoDatabase.find({ type: "Global" });
  if (!allTodosWithGlobalType) {
    res.status(401).json({
      msg: "Cannot get the Todos with Global type",
    });
  }
  res.json({ allTodosWithGlobalType });
});

app.post("/GlobalTodos/CreateTodo", async function (req, res) {
  const { title, description } = req.body;
  console.log(title, description);
  const CreatingTodo = await TodoDatabase.create({
    type: "Global",
    title: title,
    description: description,
    username: "Global",
    isCompleted: false,
  });

  if (!CreatingTodo) {
    res.status(401).json({
      msg: "UnFortunately Cannot add into DataBase",
    });
    return;
  }
  res.json({ msg: "Todo has been SuccessFully added to DataBase" });
});

app.put("/GlobalTodos/Completed", async function (req, res) {
  const updateTodoId = req.body.id;
  console.log(updateTodoId);
  const UpdateingTodoToCompleted = await TodoDatabase.findOneAndUpdate(
    { _id: updateTodoId },
    {
      isCompleted: true,
    }
  );
  if (!UpdateingTodoToCompleted) {
    res.status(401).json({
      msg: "Unable to Update Todo To Completed ",
    });
  }

  //Some Logic To Update the status of the todo to be completed.
  res.json({ msg: "Todo Has been updated To Completed in Db" });
});

app.put("/GlobalTodos/NotCompleted", async function (req, res) {
  const updateTodoId = req.body.id;
  console.log(updateTodoId);
  const UpdateingTodoToCompleted = await TodoDatabase.findOneAndUpdate(
    { _id: updateTodoId },
    {
      isCompleted: false,
    }
  );
  if (!UpdateingTodoToCompleted) {
    res.status(401).json({
      msg: "Unable to Update Todo To Completed ",
    });
  }

  //Some Logic To Update the status of the todo to be completed.
  res.json({ msg: "Todo Has been updated to NotCompleted in Db" });
});

app.listen(PORT, function () {
  console.log("Server is up and runnig");
});
