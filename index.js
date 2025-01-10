import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
app.get("/GlobalTodos/AllTodos", function (req, res) {
  //some logic to retrive all todos which type is global
  res.json({ msg: "Wokring on the logic" });
});

app.post("/GlobalTodos/CreateTodo", function (req, res) {
  const [title, description] = req.body;
  const name = "GlobalUser";

  //Some Logic To add the new todo into data
  res.json({ msg: "Wokring on the logic" });
});

app.put("/GlobalTodos/Completed", function (req, res) {
  const id = req.body.id;

  //Some Logic To Update the status of the todo to be completed.
  res.json({ msg: "Wokring on the logic" });
});

app.put("/GlobalTodos/NotCompleted", function (req, res) {
  const id = req.body.id;

  //Some Logic To Update the status of the todo to be completed.
  res.json({ msg: "Wokring on the logic" });
});

app.listen(PORT, function () {
  console.log("Server is up and runnig");
});
