const pg = require("pg");
require("dotenv").config();

let db;
if (process.env.NODE_ENV === "production") {
  db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  db = new pg.Pool({
    database: "divita",
    port: process.env.DB_PORT || 5432,
  });
}

module.exports = db;
