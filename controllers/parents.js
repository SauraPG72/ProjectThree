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

router.post("/taskslist", (req, res) => {
  const parent_id = req.body.user_id;
  console.log(parent_id);
  if (req.session.login) {
    const sql = `SELECT tasks.description, tasks.points, tasks.cents, kids.name
    FROM tasks INNER JOIN kids
    ON tasks.kid_id = kids.id
    INNER JOIN parents
    ON kids.parent_id = parents.id
    WHERE parents.id = $1`;
    db.query(sql, [parent_id])
      .then((dbResult) => {
        console.log(dbResult.rows);
        res.json({ tasksList: dbResult.rows });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false });
      });
  }
});

module.exports = router;
