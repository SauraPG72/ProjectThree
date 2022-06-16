const pg = require("pg");
require("dotenv").config();

const db = new pg.Pool({
  database: "divita",
  port: process.env.DB_PORT || 5432,
});

module.exports = db;
