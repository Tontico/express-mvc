const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./configs/db");
require("dotenv").config();

const registrationRouter = require("./router/registrationRouter");
const travelRouter = require("./router/travelRouter");
const homeRouter = require("./router/homeRouter");
const authRouter = require("./router/authRouter");
const adminRouter = require("./router/adminRouter");
const userRouter = require("./router/userRouter");
const documentRouter = require("./router/documentRouter");
const paymentRouter = require("./router/paymentRouter");

const { setUserData } = require("./middleware/auth");

const app = express();

const port = process.env.PORT || 3000;

connectDB();

app.use(cookieParser());
app.use(cors());
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

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(setUserData);

app.use("/", homeRouter);
app.use("/auth", authRouter);
app.use("/travel", travelRouter);
app.use("/admin", adminRouter);
app.use("/profile", userRouter);
app.use("/registration", registrationRouter);
app.use("/document", documentRouter);
app.use("/payment", paymentRouter);

app.listen(port, () => {
  console.log(`Server run  http://localhost:${port}`);
});
