const db = require('../db/db');
const bcrypt = require('bcrypt');
const express = require('express');

const router = express.Router();

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

router.post('/', (req, res) => {
  const { familyName, parentFirstName, userName, password, passwordCheck } = req.body;
  console.log(req.body);
  const hashedPassword = generateHash(password);

  if (!userName || userName.trim() == '') {
    res.status(400).json({ success: false, message: 'Missing valid login' });
  } else if (!password || password.trim() == '') {
    res.status(400).json({ success: false, message: 'Missing valid password' });
  } else {
    const sql = `INSERT into parents (name, login_name, password_hash, family_name) VALUES ($1, $2, $3, $4)`;
    db.query(sql, [parentFirstName, userName, hashedPassword, familyName]).then((dbResult) => {
      res.json({ success: true });
    });
  }
});

module.exports = router;
