import express from "express";
import dotenv from "dotenv";
import { TodoDatabase, UserDatabase, OrganizationDatabase } from "./db.js";

import cors from "cors";
import {
  OrganizationSchemaValdaition,
  TodoSchema,
  TodoSchemaIndiviual,
  UserId,
  UserNameSchema,
} from "./type.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT;

app.get("/GlobalTodos/AllTodos", async function (req, res) {
  //some logic to retrive all todos which type is global
  const allTodosWithGlobalType = await TodoDatabase.find({ type: "Global" });
  console.log(allTodosWithGlobalType);
  if (!allTodosWithGlobalType) {
    res.status(401).json({
      msg: "Cannot get the Todos with Global type",
    });
  }
  res.json({ allTodosWithGlobalType });
});

app.post("/GlobalTodos/CreateTodo", async function (req, res) {
  const { title, description } = req.body;
  const ParsedUserInputs = TodoSchema.safeParse(req.body);
  if (!ParsedUserInputs.success) {
    return res.json({
      msg: "Invalid Title or Description length",
    });
  }

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
  const Parsingid = UserId.safeParse(updateTodoId);
  if (!Parsingid.success) {
    return res.json({
      msg: "Incorrect Id",
    });
  }
  try {
    const UpdateingTodoToCompleted = await TodoDatabase.findOneAndUpdate(
      { _id: updateTodoId },
      {
        isCompleted: true,
      }
    );
    if (!UpdateingTodoToCompleted) {
      return res.status(401).json({
        msg: "Unable to Update Todo To Completed ",
      });
    }
  } catch (err) {
    return res.json({ msg: err });
  }

  //Some Logic To Update the status of the todo to be completed.
  res.json({ msg: "Todo Has been updated To Completed in Db" });
});

app.put("/GlobalTodos/NotCompleted", async function (req, res) {
  const updateTodoId = req.body.id;

  const Parsingid = UserId.safeParse(updateTodoId);

  if (!Parsingid.success) {
    return res.json({
      msg: "Incorrect Id",
    });
  }

  try {
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
  } catch (err) {
    return res.json({
      msg: err,
    });
  }

  //Some Logic To Update the status of the todo to be completed.
  res.json({ msg: "Todo Has been updated to NotCompleted in Db" });
});

//For Indiviual Backedn

app.get("/Indiviual/AllTodos", async function (req, res) {
  //some logic to retrive all todos which type is global
  const allTodosWithIndiviualType = await TodoDatabase.find({
    type: "Indiviual",
  });
  console.log(allTodosWithIndiviualType);
  if (!allTodosWithIndiviualType) {
    res.status(401).json({
      msg: "Cannot get the Todos with Global type",
    });
  }
  res.json({ allTodosWithIndiviualType });
});

app.post("/Indiviual/CreateTodo", async function (req, res) {
  const { title, description, username } = req.body;
  const ParsedUserInputs = TodoSchemaIndiviual.safeParse(req.body);
  if (!ParsedUserInputs.success) {
    return res.json({
      msg: "Invalid Title or Description length",
    });
  }

  const CreatingTodo = await TodoDatabase.create({
    type: "Indiviual",
    title: title,
    description: description,
    username: username,
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

app.put("/IndiviualTodos/Completed", async function (req, res) {
  const updateTodoId = req.body.id;
  const Parsingid = UserId.safeParse(updateTodoId);
  if (!Parsingid.success) {
    return res.json({
      msg: "Incorrect Id",
    });
  }
  try {
    const UpdateingTodoToCompleted = await TodoDatabase.findOneAndUpdate(
      { _id: updateTodoId },
      {
        isCompleted: true,
      }
    );
    if (!UpdateingTodoToCompleted) {
      return res.status(401).json({
        msg: "Unable to Update Todo To Completed ",
      });
    }
  } catch (err) {
    return res.json({ msg: err });
  }

  //Some Logic To Update the status of the todo to be completed.
  res.json({ msg: "Todo Has been updated To Completed in Db" });
});

app.put("/Indiviualtodos/NotCompleted", async function (req, res) {
  const updateTodoId = req.body.id;

  const Parsingid = UserId.safeParse(updateTodoId);

  if (!Parsingid.success) {
    return res.json({
      msg: "Incorrect Id",
    });
  }

  try {
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
  } catch (err) {
    return res.json({
      msg: err,
    });
  }

  //Some Logic To Update the status of the todo to be completed.
  res.json({ msg: "Todo Has been updated to NotCompleted in Db" });
});

//End point for userDatbase

app.post("/users/CreateUser", async function (req, res) {
  const username = req.body.username;

  const userNameParsing = UserNameSchema.safeParse(username);
  console.log(userNameParsing);
  if (!userNameParsing.success) {
    return res.json({
      msg: "Incorrect Username",
    });
  }

  try {
    const AddingUserNameToDatabase = await UserDatabase.create({
      username: username,
    });
    if (!AddingUserNameToDatabase) {
      console.log(Add);
      res.status(401).json({
        msg: "Unable to Added User into Database ",
      });
    }
  } catch (err) {
    return res.json({
      msg: err,
    });
  }

  //Some Logic To Update the status of the todo to be completed.
  res.json({ msg: "User  has been added to Database" });
});

app.post("/Organzations/CreateOrganztion", async function (req, res) {
  const { name, pin } = req.body;

  const OrgnationSafeParsing = OrganizationSchemaValdaition.safeParse(req.body);
  if (!OrgnationSafeParsing.success) {
    return res.json({
      msg: "Incorrect Name or Pin",
    });
  }
  try {
    const AddingOrganztionToDb = await OrganizationDatabase.create({
      name: name,
      Pin: pin,
    });
    if (!AddingOrganztionToDb) {
      console.log(Add);
      res.status(401).json({
        msg: "Unable to Organztion  into Database ",
      });
    }
  } catch (err) {
    return res.json({
      msg: err,
    });
  }

  //Some Logic To Update the status of the todo to be completed.
  res.json({ msg: "Organztiopn has been added to Database" });
});

app.listen(PORT, function () {
  console.log("Server is up and runnig");
});
