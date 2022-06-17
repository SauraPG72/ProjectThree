const db = require("../db/db");
const express = require("express");
const app = express();
app.use(express.json());

const router = express.Router();

router.get("/tally/:id", (req, res) => {
  const parent_id = req.params.id;
  if (req.session.loggedIn) {
    const sql = "SELECT * FROM kids WHERE parent_id = $1";
    db.query(sql, [parent_id])
      .then((dbResult) => {
        res.json({ kidsData: dbResult.rows });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false });
      });
  }
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

router.post("/task", (req, res) => {
  const sql = `INSERT INTO tasks (description, kid_id, status, points, cents, expiry_date, category)
  VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  db.query(sql, [
    req.body.description,
    req.body.kid_id,
    req.body.status,
    req.body.points,
    req.body.cents,
    req.body.expiry_date,
    req.body.category,
  ])
    .then(() => {
      res.json({ seccess: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: "Fail",
        message: "Sorry there was an unknown server error.",
        error: err,
      });
    });
});

module.exports = router;
