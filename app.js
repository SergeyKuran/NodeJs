const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { globalError } = require("./middlewares/globalError");
const { errorNotFound } = require("./middlewares/errorNotFound");
require("dotenv").config();

const contactsRouter = require("./routes/contacts");
const authRouter = require("./routes/auth.js");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.static("public"));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api", contactsRouter);
app.use(errorNotFound);
app.use(globalError);

module.exports = app;
