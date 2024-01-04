const { Sequelize } = require("sequelize");
require("dotenv").config();
const {
  standardOutputLogger,
  standardErrorLogger,
} = require("../utils/logger");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,

  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: false,
      allowPublicKeyRetrieval: true,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected.");
    standardOutputLogger.info("Database Connected.");
  })
  .catch((error) => {
    console.log("Database Connection Error", error);
    standardErrorLogger.error("Database Connection Error", error);
  });

module.exports = sequelize;
