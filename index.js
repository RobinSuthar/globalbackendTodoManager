import express from "express";
import dotenv from "dotenv";
import {
  TodoDatabase,
  UserDatabase,
  OrganizationDatabase,
  CompanyDatbase,
} from "./db.js";

import cors from "cors";
import {
  CompanySchema,
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

app.get("/Indiviual/ParticulatIndiviualTodos", async function (req, res) {
  //some logic to retrive all todos which type is global
  const usernmae = req.headers.username;
  console.log("This is req.body : ", req.headers.username);
  const allTodosWithIndiviualType = await TodoDatabase.find({
    username: usernmae,
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

//********************** */
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
  console.log(req.body);
  const { companyName, companyPin } = req.body;

  const OrgnationSafeParsing = OrganizationSchemaValdaition.safeParse(req.body);

  if (!OrgnationSafeParsing.success) {
    return res.json({
      msg: "Incorrect Name or Pin",
    });
  }
  try {
    const AddingOrganztionToDb = await OrganizationDatabase.create({
      name: companyName,
      Pin: companyPin,
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

//Three End point for the Company Todos Management

app.get("/Company/AllTodos", async function (req, res) {
  //some logic to retrive all todos which type is global

  const nameOfTheCompany = req.headers.companyname;
  const allTodosByCompany = await CompanyDatbase.find({
    name: nameOfTheCompany,
  });
  console.log(allTodosByCompany);
  if (!allTodosByCompany) {
    res.status(401).json({
      msg: "Cannot get the Todos with Global type",
    });
  }
  res.json({ allTodosByCompany });
});

app.post("/Company/Todos", async function (req, res) {
  console.log(req.body);
  const { companyName, author, description, title, importance, tag } = req.body;
  console.log(companyName, author, description, title, importance, tag);
  const ParsingCompanyTodo = CompanySchema.safeParse(req.body);
  console.log(ParsingCompanyTodo);
  if (!ParsingCompanyTodo.success) {
    return res.json({
      msg: "Thats incorrect format to send a compnay Todo",
    });
  }

  try {
    const AddingCompanyTodo = await CompanyDatbase.create({
      name: companyName,
      author: author,
      title: title,
      description: description,
      importance: importance,
      tag: tag,
      isCompleted: false,
    });
    if (!AddingCompanyTodo) {
      return res.status(401).json({
        msg: "Unable to Add Compant Todo into Datbase ",
      });
    }
  } catch (err) {
    return res.json({ msg: err });
  }

  //Some Logic To Update the status of the todo to be completed.
  res.json({ msg: "Compant Todo has been added into Db" });
});

app.put("/Company/isCompleted", async function (req, res) {
  const updateTodoId = req.body.id;

  const Parsingid = UserId.safeParse(updateTodoId);

  if (!Parsingid.success) {
    return res.json({
      msg: "Incorrect Id",
    });
  }

  try {
    const UpdateingTodoToCompleted = await CompanyDatbase.findOneAndUpdate(
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
  } catch (err) {
    return res.json({
      msg: err,
    });
  }

  //Some Logic To Update the status of the todo to be completed.
  res.json({ msg: "Todo Has been updated In the  Db" });
});

app.put("/Company/NotCompleted", async function (req, res) {
  const updateTodoId = req.body.id;

  const Parsingid = UserId.safeParse(updateTodoId);

  if (!Parsingid.success) {
    return res.json({
      msg: "Incorrect Id",
    });
  }

  try {
    const UpdateingTodoToCompleted = await CompanyDatbase.findOneAndUpdate(
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

app.listen(PORT, function () {
  console.log("Server is up and runnig");
});
