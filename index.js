const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const travelRouter = require("./router/travelRouter");
const homeRouter = require("./router/homeRouter");
const authRouter = require("./router/authRouter");
const adminRouter = require("./router/adminRouter");
const userRouter = require("./router/userRouter");
const connectDB = require("./configs/db");
const { setUserData } = require("./middleware/auth");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

connectDB();

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.set("view engine", "ejs");
app.set("views", "views");

app.use(expressLayout);
app.set("layout", "base");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.use(cookieParser());
app.use(cors());

app.use(express.static("public"));

app.use(setUserData);

app.use("/", homeRouter);
app.use("/auth", authRouter);
app.use("/travel", travelRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server run  http://localhost:${port}`);
});
