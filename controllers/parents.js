const db = require("../db/db");
const express = require("express");

const router = express.Router();

router.post("/tally", (req, res) => {
  const parent_id = req.body.user_id;
  if (req.session.login) {
    const sql = `SELECT * FROM kids WHERE parent_id = $1`;
    db.query(sql, [parent_id])
      .then((dbResult) => {
        console.log(dbResult.rows);
        res.json({ kidsData: dbResult.rows });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false });
      });
  }
  console.log(req.session);
  console.log(req.body);
});

module.exports = router;
