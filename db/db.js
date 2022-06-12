const pg = require("pg");

const db = new pg.Pool({
    database: 'divita'
})

module.exports = db