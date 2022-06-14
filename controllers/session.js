const express = require('express');
const router = express.Router();
const db = require('../db/db');
const bcrypt = require('bcrypt');

function isValidPassword(plainTextPassword, passwordHash) {
  // Returns true or false
  return bcrypt.compareSync(plainTextPassword, passwordHash);
}

router.post('/', (req, res) => {
  // get login and pw from the body of the request
  const { login, password } = req.body;
  //check the login and pw with the DB and set the session
  console.log(login);
  sql = `SELECT * from parents WHERE login_name = $1`;
  db.query(sql, [login])
    .then((dbResult) => {
      console.log(dbResult.rows);
      if (login == dbResult.rows[0].login_name) {
        if (isValidPassword(password, dbResult.rows[0].password_hash)) {
          req.session.userId = 1;
          req.session.login = req.body.login;
          res.json({ success: true });
        } else {
          res.status(400).json({ message: 'password is incorrect' });
        }
      }
    })
    .catch((err) => {
      res.status(400).json({ message: 'login is incorrect' });
    });
  console.log(password);
});

router.get('/', (req, res) => {
  res.json(req.session);
});

router.delete('/', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

module.exports = router;
