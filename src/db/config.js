const db = require("mongoose");
const config = require("../config/config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = encodeURIComponent(config.dbHost);
const PORT = encodeURIComponent(config.dbPort);
const NAME = encodeURIComponent(config.dbName);

async function connect(mongoUri) {
  console.log(mongoUri);
  await db.connect(mongoUri);
  console.log("[DB] Connected");
}

module.exports = { USER, PASSWORD, HOST, NAME, PORT, connect };
