const jwt = require("jsonwebtoken");
const usersRepository = require("../repositories/userRepository");

const setUserData = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.locals.user = null;
      res.locals.isAuthenticated = false;
      res.locals.isAdmin = false;
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await usersRepository.findOne({ _id: decoded.id });

    if (!user) {
      res.locals.user = null;
      res.locals.isAuthenticated = false;
      res.locals.isAdmin = false;
      res.clearCookie("token");
      return;
    }

    res.locals.user = user;
    res.locals.isAuthenticated = true;
    res.locals.isAdmin = user.roles === "admin";
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).redirect("auth/login");
  }
};
const isAuthenticated = async (req, res, next) => {
  if (req.user && res.locals.isAuthenticated) {
    return next();
  }

  return res.status(401).redirect("/auth/login");
};

const isAdmin = (req, res, next) => {
  if (res.locals.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: "Accès interdit - Admin requis" });
};

const redirectIfAuthenticated = (req, res, next) => {
  if (res.locals.isAuthenticated) {
    return res.redirect("/");
  }
  next();
};

module.exports = {
  setUserData,
  isAuthenticated,
  isAdmin,
  redirectIfAuthenticated,
};
