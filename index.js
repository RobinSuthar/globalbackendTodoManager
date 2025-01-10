import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
app.get("/GlobalTodos", function (req, res) {
  res.json({ msg: "Wokring on the logic" });
});

app.get("/GlobalTodos", function (req, res) {
  res.json({ msg: "Wokring on the logic" });
});

app.get("/GlobalTodos", function (req, res) {
  res.json({ msg: "Wokring on the logic" });
});

app.listen(PORT, function () {
  console.log("Server is up and runnig");
});
