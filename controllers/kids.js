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

router.post('/goals', (req, res ) => {
  const kidId = req.session.userId;
  let { description, cents, points, allPoints, allCents } = req.body;
  
  if (cents) {
    if (!allCents) {
    allCents = 0
    }
    const sql = 'INSERT INTO goals (kid_id, description, cents, allocated_cents) VALUES ($1, $2, $3, $4)'
    db.query(sql, [kidId, description, +cents, +allCents]).then(() => {
      res.json({success: true})
      console.log(req.body)
    })
    
    
  }
  else if (req.body.points) {
    if (!allPoints) {
      allPoints = 0;
    }
      const sql = 'INSERT INTO goals (kid_id, description, points) VALUES ($1, $2, $3, $4)'
      db.query(sql, [kidId, description, +points, +allPoints]).then(() => {
        res.json({success: true})
    })
    
    
  }
})

router.post('/task', (req, res) => {
  const kidId = req.session.userId;


  let { description, points, cents, expiry, category } = req.body
  if (!points) {
    points = 0
  }
  if (!cents) {
    cents = 0
  }
  const sql = `INSERT INTO tasks (description, kid_id, status, points, cents, expiry_date, category) VALUES ($1, $2, $3, $4, $5, $6, $7)`
  const kidStatus = 'pending'
  db.query(sql, [description ,kidId, kidStatus, +points, +cents, expiry, category]).then(() => {
    res.json({success: true})
  })

})

module.exports = router;
