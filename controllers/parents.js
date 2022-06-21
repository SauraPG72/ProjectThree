const db = require("../db/db");
const express = require("express");
const app = express();
app.use(express.json());

const router = express.Router();

// ======================= TALLY =======================

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

// ======================= TASKS =======================

// for parents page to get all the tasks assigned for all the kids of the parent
// :id in the url is parent's id
router.get("/taskslist/:id", (req, res) => {
  const parent_id = req.params.id;

  if (req.session.loggedIn) {
    const sql = `SELECT tasks.description, tasks.points, tasks.cents, kids.name, kids.id
    FROM tasks INNER JOIN kids
    ON tasks.kid_id = kids.id
    INNER JOIN parents
    ON kids.parent_id = parents.id
    WHERE parents.id = $1 AND tasks.status='approved' AND tasks.expiry_date::date >= to_timestamp(${Date.now()} / 1000.0)`;
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

// for parents to add tasks for kids
router.post("/task", (req, res) => {
  const createdDate = new Date(req.body.expiry_date);

  const sql = `INSERT INTO tasks (description, kid_id, status, points, cents, expiry_date, category)
  VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  db.query(sql, [
    req.body.description,
    req.body.kid_id,
    req.body.status,
    req.body.points,
    req.body.cents,
    createdDate,
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

//============== task completion report =======================

// to get all the tasks done by the kids
router.get("/tasksreport/:id", (req, res) => {
  const parent_id = req.params.id;

  if (req.session.loggedIn) {
    const sql = `SELECT tasks.id as t_id,tasks.description, tasks.points, tasks.cents, kids.name, kids.id
    FROM tasks INNER JOIN kids
    ON tasks.kid_id = kids.id
    INNER JOIN parents
    ON kids.parent_id = parents.id
    WHERE parents.id = $1 AND tasks.status='completed'`;
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

// to change the status completed task (when parents approve kids' task completion request)
// and then redeem points/money of that task
router.patch("/taskcomplete/:id", (req, res) => {
  const taskId = req.params.id;

  if (!taskId) {
    res.status(400).json({ success: false, message: "Missing valid task id" });
  } else {
    const sql = `UPDATE tasks SET status='redeemed' WHERE id=${taskId}`;
    db.query(sql)
      .then(() => {
        if (req.body.cents) {
          const redeemSql = `UPDATE kids
          SET total_cents = total_cents + ${req.body.cents}
          FROM tasks  WHERE tasks.id = ${taskId} AND tasks.kid_id=kids.id;`;
          db.query(redeemSql).then(() => {
            res.json({ seccess: "Successfully redeemed money!" });
          });
        } else if (req.body.points) {
          const redeemSql = `UPDATE kids
          SET total_points = total_points + ${req.body.points}
          FROM tasks  WHERE tasks.id = ${taskId} AND tasks.kid_id=kids.id;`;
          db.query(redeemSql).then(() => {
            res.json({ seccess: "Successfully redeemed points!" });
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ seccess: "fail", error: err });
      });
  }
});

//============== pending tasks =======================

router.get("/pendingTasks/:id", (req, res) => {
  const parent_id = req.params.id;

  if (req.session.loggedIn) {
    const sql = `SELECT tasks.id as t_id,tasks.description, tasks.points, tasks.cents, kids.name, kids.id
    FROM tasks INNER JOIN kids
    ON tasks.kid_id = kids.id
    INNER JOIN parents
    ON kids.parent_id = parents.id
    WHERE parents.id = $1 AND tasks.status='pending'`;
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

// route tochange the status of a task from 'pending' to 'approved'
router.patch("/pendingTasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;

  if (!taskId) {
    res.status(400).json({ success: false, message: "Missing valid task id" });
  } else {
    const sql = `UPDATE tasks SET status='approved' WHERE id=${taskId}`;
    db.query(sql)
      .then(() => {
        res.json({ seccess: "Successfully changed the status of the task!" });
      })
      .catch((err) => {
        res.status(500).json({ seccess: "fail", error: err });
      });
  }
});

// rejecting a requested task from kids
router.delete("/pendingTasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;

  if (!taskId) {
    res.status(400).json({ success: false, message: "Missing valid task id" });
  } else {
    const sql = `DELETE FROM tasks WHERE id=${taskId}`;
    db.query(sql)
      .then(() => {
        res.json({ seccess: "Successfully deleted the task!" });
      })
      .catch((err) => {
        res.status(500).json({ seccess: "fail", error: err });
      });
  }
});

//============== pending goals =======================

router.get("/pendingGoals/:id", (req, res) => {
  const parent_id = req.params.id;

  if (req.session.loggedIn) {
    const sql = `SELECT goals.id as t_id,goals.description, goals.points,  kids.name, kids.id
    FROM goals INNER JOIN kids
    ON goals.kid_id = kids.id
    INNER JOIN parents
    ON kids.parent_id = parents.id
    WHERE parents.id = $1 AND goals.status='pending'`;
    db.query(sql, [parent_id])
      .then((dbResult) => {
        res.json({ goalsList: dbResult.rows });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false });
      });
  }
});

// approving requested goals with points
router.patch("/pendingGoals/:id", (req, res) => {
  const goalId = req.params.id;
  if (!goalId) {
    res.status(400).json({ success: false, message: "Missing valid task id" });
  } else {
    const sql = `UPDATE goals SET status='approved' WHERE id=${goalId}`;
    db.query(sql)
      .then(() => {
        res.json({ seccess: "Successfully changed the status of the goal!" });
      })
      .catch((err) => {
        res.status(500).json({ seccess: "fail", error: err });
      });
  }
});

// rejecting a requested goal with points from kids
router.delete("/pendingGoals/:id", (req, res) => {
  const goalId = req.params.id;
  if (!goalId) {
    res.status(400).json({ success: false, message: "Missing valid task id" });
  } else {
    const sql = `DELETE FROM goals WHERE id=${goalId}`;
    db.query(sql)
      .then(() => {
        res.json({ seccess: "Successfully deleted the goal!" });
      })
      .catch((err) => {
        res.status(500).json({ seccess: "fail", error: err });
      });
  }
});

module.exports = router;
