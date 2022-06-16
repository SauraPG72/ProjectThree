const db = require('../db/db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const kid_name = req.session.username;
    console.log(kid_name);
    if (req.session.loggedIn) {
      const sql = 'SELECT * FROM kids WHERE login_name = $1';
      db.query(sql, [kid_name])
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

router.get('/tasks', (req, res) => {
    const kidId = req.session.userId;
    const sql = 'SELECT * FROM tasks WHERE kid_id = $1';
    db.query(sql, [kidId])
        .then((dbResult) => {
            const taskRows = dbResult.rows
            res.json(taskRows)
        })
})

router.get('/goals', (req, res) => {
    const kidId = req.session.userId;
    const sql = 'SELECT * FROM goals WHERE kid_id = $1';
    db.query(sql, [kidId])
        .then((dbResult) => {
            const goalRows = dbResult.rows
            res.json(goalRows)
        })

})

module.exports = router;
