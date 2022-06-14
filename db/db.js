const pg = require('pg');

const db = new pg.Pool({
  database: 'divita',
  port: 5433,
});

module.exports = db;
