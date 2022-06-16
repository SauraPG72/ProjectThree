const db = require("../db/db");
const express = require("express");

const router = express.Router();

router.get("/tally/:id", (req, res) => {
  const parent_id = req.params.id;
  if (req.session.loggedIn) {
    const sql = "SELECT * FROM kids WHERE parent_id = $1";
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
  //  console.log(req.session);
  //  console.log(req.body);
});

router.get("/taskslist/:id", (req, res) => {
  const parent_id = req.params.id;
  if (req.session.loggedIn) {
    const sql = `SELECT tasks.description, tasks.points, tasks.cents, kids.name, kids.id
    FROM tasks INNER JOIN kids
    ON tasks.kid_id = kids.id
    INNER JOIN parents
    ON kids.parent_id = parents.id
    WHERE parents.id = $1`;
    db.query(sql, [parent_id])
      .then((dbResult) => {
        res.json({ tasksList: dbResult.rows });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false });
      });
  }
});

module.exports = router;
