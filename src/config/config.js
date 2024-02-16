require("dotenv").config();

const config = {
  port: process.env.PORT,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
};

module.exports = config;
