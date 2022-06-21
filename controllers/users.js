const db = require("../db/db");
const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

router.get("/kids-by-parent-id/:id", (req, res) => {
  db.query("SELECT * FROM kids WHERE parent_id = $1", [req.params.id])
    .then((dbResult) => {
      console.log(dbResult.rows);
      res.json(dbResult.rows);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//router.get("/:type/:id", (req, res) => {
//  let sql = "";
//  const userId = req.params.id;
//  if (req.params.type == "parent") sql = "SELECT * FROM parents WHERE id = $1";
//  if (req.params.type == "kid") sql = "SELECT * FROM kids WHERE id = $1";

//  db.query(sql, [userId]).then((dbResult) => {
//    res.json(dbResult.rows);
//  });
//});

router.post("/", (req, res) => {
  const { familyName, parentFirstName, userName, password, passwordCheck } = req.body;

  //Check if username exists
  db.query("SELECT login_name FROM parents").then((dbResult) => {
    const allUserNames = dbResult.rows.map((user) => user.login_name);
    if (allUserNames.includes(userName)) {
      res.status(400).json({
        status: "error",
        message: "Username Already Exists. Please Choose Another Username",
      });
      return;
    }
  });

  const hashedPassword = generateHash(password);

  if (!userName || userName.trim() == "") {
    res.status(400).json({ success: false, message: "Missing valid login" });
  } else if (!password || password.trim() == "") {
    res.status(400).json({ success: false, message: "Missing valid password" });
  } else {
    const sql = `INSERT into parents (name, login_name, password_hash, family_name) VALUES ($1, $2, $3, $4)`;
    db.query(sql, [parentFirstName, userName, hashedPassword, familyName]).then((dbResult) => {
      res.json({ status: "success" });
    });
  }
});

// kids signup
router.post("/kids", (req, res) => {
  const { name, login_name, parent_id, password, total_points, total_cents, avatar } = req.body;
  const hashedPassword = generateHash(password);

  if (!name || name.trim() == "") {
    res.status(400).json({ success: false, message: "Missing valid login" });
  } else if (!password || password.trim() == "") {
    res.status(400).json({ success: false, message: "Missing valid password" });
  } else {
    const sql = `INSERT into kids (name, parent_id, login_name, password_hash, total_points, total_cents, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    db.query(sql, [
      name,
      parent_id,
      login_name.toLowerCase(),
      hashedPassword,
      total_points,
      total_cents,
      avatar,
    ])
      .then((dbResult) => {
        console.log(dbResult);
        res.json({ status: "success" });
      })
      .catch((err) => {
        res.status(500).json({ success: false, message: "Server Error" });
      });
  }
});

module.exports = router;
