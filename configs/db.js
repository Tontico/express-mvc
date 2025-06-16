const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./data/db.sqlite",
});

db.sync({ alter: true });

module.exports = db;
