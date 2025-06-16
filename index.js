const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const taskRouter = require("./router/tasksRouter");

const app = express();
const port = 3000;
const cors = require("cors");

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(expressLayout);
app.set("layout", "base");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(cors());

app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Server run  http://localhost:${port}`);
});
