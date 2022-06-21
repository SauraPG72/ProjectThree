const db = require("../db/db");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const kid_name = req.session.username;

  if (req.session.loggedIn) {
    const sql = "SELECT * FROM kids WHERE login_name = $1";
    db.query(sql, [kid_name.toLowerCase()])
      .then((dbResult) => {
        console.log(dbResult.rows);
        res.json({ kidsData: dbResult.rows[0] });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false });
      });
  }
});

router.get("/tasks", (req, res) => {
  const kidId = req.session.userId;
  const sql = "SELECT * FROM tasks WHERE kid_id = $1";
  db.query(sql, [kidId]).then((dbResult) => {
    const taskRows = dbResult.rows;
    res.json(taskRows);
  });
});

router.get("/goals", (req, res) => {
  const kidId = req.session.userId;
  const sql = "SELECT * FROM goals WHERE kid_id = $1";
  db.query(sql, [kidId]).then((dbResult) => {
    const goalRows = dbResult.rows;
    res.json(goalRows);
  });
});

router.post("/goals", (req, res) => {
  const kidId = req.session.userId;
  let { description, cents, currency, allCents } = req.body;

  if (currency == "cents") {
    if (!allCents) {
      allCents = 0;
    }
    const sql =
      "INSERT INTO goals (kid_id, description, cents, allocated_cents, status) VALUES ($1, $2, $3, $4, $5)";
    db.query(sql, [kidId, description, +cents * 100, +allCents * 100, "approved"]).then(() => {
      res.json({ success: true });
      console.log(req.body);
    });
  } else if (currency == "points") {
    if (!allCents) {
      allPoints = 0;
    }
    const sql =
      "INSERT INTO goals (kid_id, description, points, allocated_points) VALUES ($1, $2, $3, $4, $5)";
    db.query(sql, [kidId, description, +cents, +allCents, "pending"]).then(() => {
      res.json({ success: true });
    });
  }
});

router.post("/task", (req, res) => {
  const kidId = req.session.userId;

  let { description, points, cents, expiry, category } = req.body;
  if (!points) {
    points = 0;
  }
  if (!cents) {
    cents = 0;
  }
  const sql = `INSERT INTO tasks (description, kid_id, status, points, cents, expiry_date, category) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  const kidStatus = "pending";
  db.query(sql, [description, kidId, kidStatus, +points, +cents, expiry, category]).then(() => {
    res.json({ success: true });
  });
});

// allocating money to goals

router.post("/all-cents", (req, res) => {
  const kidId = req.session.userId;
  let { allCents, goalId } = req.body;

  console.log(req.body);

  const sql = `SELECT * FROM goals WHERE kid_id = $1 AND id = $2`;
  db.query(sql, [kidId, goalId]).then((dbResult) => {
    const resultGoal = dbResult.rows[0];
    console.log(kidId, goalId);
    console.log(resultGoal);
    let changeMade = parseInt(allCents) + parseInt(resultGoal.allocated_cents);
    if (changeMade > resultGoal.cents) {
      res.json({ message: "You have allocated too many dollars" });
    } else {
      const sql2 = `UPDATE goals SET allocated_cents = $1 WHERE id = $2`;
      db.query(sql2, [changeMade, goalId]).then(() => {
        if (changeMade == resultGoal.cents) {
          res.json({ message: "You have hit your goal!!!" });
        } else {
          res.json({
            message: `You have $${resultGoal.cents * 0.01 - changeMade * 0.01} to go`,
          });
        }
      });
    }
  });
});

router.post("/all-points", (req, res) => {
  let { kidId, allPoints, goalId } = req.body;

  const sql = `SELECT * FROM goals WHERE kid_id = $1 AND id = $2`;
  db.query(sql, [kidId, goalId]).then((dbResult) => {
    const resultGoal = dbResult.rows[0];

    if (resultGoal.points) {
      let changeMade = allPoints + resultGoal.allocated_points;
      if (changeMade > resultGoal.points) {
        res.json({ message: "You have allocated too many points" });
      } else {
        const sql2 = `UPDATE goals SET allocated_points = $1 WHERE id = $2`;
        db.query(sql2, [changeMade, goalId]).then(() => {
          if (changeMade == resultGoal.points) {
            res.json({ message: "You have hit your goal!!!" });
          } else {
            res.json({
              message: `You have $${resultGoal.points - changeMade} to go`,
            });
          }
        });
      }
    } else {
      res.json({
        message: "You are allocating points to a money earning task",
      });
    }
  });
});

module.exports = router;
