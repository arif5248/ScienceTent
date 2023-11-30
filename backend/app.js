const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const user = require("./routes/userRoutes");
const batch = require("./routes/batchRoutes");
const student = require("./routes/studentRoutes");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", user);
app.use("/api/v1", batch);
app.use("/api/v1", student);

app.use(errorMiddleware);

module.exports = app;
