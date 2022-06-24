const db = require("../db/db");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const kid_name = req.session.username;

  if (req.session.loggedIn) {
    const sql = "SELECT * FROM kids WHERE login_name = $1";
    db.query(sql, [kid_name.toLowerCase()])
      .then((dbResult) => {
        // console.log(dbResult.rows);
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

// Getting the kids data :) 
router.get('/kids/data', (req, res) => {
  let kidUser = req.session.userId
  // kidUser = req.body.user
  const master = {}
  const sql = `select goals.id, description, kid_id, cents, points, allocated_cents, allocated_points from goals where kid_id = $1`
  db.query(sql, [kidUser]).then(dbResult => {
    const allGoals = dbResult.rows
    let pointGoals = allGoals.filter(goal => !goal["cents"])  
    .map(goal => goal.allocated_points)
    .reduce((x, y) => x + y, 0)
    
    let centGoals = allGoals.filter(goal => goal["cents"]).map(goal => goal.allocated_cents).reduce((x, y) => x + y, 0)
    
    res.json({
      pointGoals: pointGoals,
      centGoals: centGoals
    })
  })
})

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
      "INSERT INTO goals (kid_id, description, points, allocated_points, status) VALUES ($1, $2, $3, $4, $5)";
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
  let kidId = req.session.userId
  let { allPoints, goalId } = req.body;
  
  console.log(kidId, goalId)

  const sql = `SELECT * FROM goals WHERE kid_id = $1 AND id = $2`;
  db.query(sql, [kidId, goalId]).then((dbResult) => {
    const resultGoal = dbResult.rows[0];
    console.log(dbResult)
    
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
    
  });
});

router.patch("/complete-task/:taskId", (req, res) => {
  db.query("UPDATE tasks SET status = 'completed' WHERE id = $1", [req.params.taskId])
    .then((dbResult) => res.status(200).json({ status: "success" }))
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete("/delete-task/:taskId", (req, res) => {
  db.query("DELETE FROM tasks WHERE id = $1", [req.params.taskId])
    .then((dbResult) => res.status(200).json({ status: "success" }))
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete("/delete-goal/:goalId", (req, res) => {
  const kidId = req.session.userId
  // const kidId = 1
  const  goalId = req.params.goalId;
  sql = `DELETE from goals WHERE id = $1`

  db.query(sql, [goalId]).then((dbResult) => 
    res.json( {success: true} ))
})

router.post("/redeem-goal/:goalId", (req, res) => {
  const goalId = req.params.goalId;
  sql = 'SELECT * from goals WHERE id = $1';
  db.query(sql, [goalId]).then((dbResult) => {
    
   if (dbResult.rows[0].cents) {
      const subPoints = `UPDATE kids SET total_cents = total_cents - $1 WHERE id = $2`
    
    db.query(subPoints, [dbResult.rows[0].cents, dbResult.rows[0].kid_id]).then(() => {
      const deleteGoal = `DELETE from goals WHERE id = $1`
      db.query(deleteGoal, [dbResult.rows[0].id]).then(() => {
        res.json({success: true})
      })
    })
  }
  else {
    const subPoints = `UPDATE kids SET total_points = total_points - $1 WHERE id = $2`
    
    db.query(subPoints, [dbResult.rows[0].points, dbResult.rows[0].kid_id]).then(() => {
      const deleteGoal = `DELETE from goals WHERE id = $1`
      db.query(deleteGoal, [dbResult.rows[0].id]).then(() => {
        res.json({success: true})
      })
    })
  }
    
  })
})

module.exports = router;
