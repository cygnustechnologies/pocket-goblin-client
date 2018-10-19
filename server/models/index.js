//In order to get views support with model sync, we use this library
// const Sequelize = require("sequelize");
const Sequelize = require("sequelize-views-support");
const dotenv = require("dotenv");

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

//FIXME:Move these things into environmental variables
const dbName = process.env.POSTGRES_DB || "pocketgoblin";
const dbUser = process.env.POSTGRES_USER || "postgres";
const dbPassword = process.env.POSTGRES_PASSWORD || "";
const dbHost = process.env.POSTGRES_HOST || "localhost";

var sequelize;

if (process.env.POSTGRES_HOST) {
  sequelize = new Sequelize(dbHost);
} else {
  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: "postgres",
    host: dbHost
  });
}

const models = {
  Account: sequelize.import("./account"),
  User: sequelize.import("./user"),
  Item: sequelize.import("./item"),
  Transaction: sequelize.import("./transaction"),
  Snapshot: sequelize.import("./snapshot"),
  Cashflow: sequelize.import("./cashflow"),
  TopSpending: sequelize.import("./topSpending")
};

Object.keys(models).forEach(model => {
  if ("associate" in models[model]) {
    models[model].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
