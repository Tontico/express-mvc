const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const travelRouter = require("./router/travelRouter");
const homeRouter = require("./router/homeRouter");
const authRouter = require("./router/authRouter");
const adminRouter = require("./router/adminRouter");
const connectDB = require("./configs/db");
const { setUserData } = require("./middleware/auth");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(methodOverride("_method"));
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Server run  http://localhost:${port}`);
});
