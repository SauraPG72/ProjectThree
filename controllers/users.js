const db = require("../db/db")
const bcrypt = require('bcrypt')
const express = require('express');

const router = express.Router()

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}


router.post(`/`, (req, res) => {
    console.log(req.body)
    let login = req.body.login
    let family = req.body.family
    let parent = req.body.parent
    let unhashedPW = req.body.pw
    const hashedPW = generateHash(unhashedPW)
    
    if (!login || login.trim() == "") {
        res.status(400).json({success: false, message: "Missing valid login"})
    }
    else if (!hashedPW || hashedPW.trim() == "") {
        res.status(400).json({success: false, message: "Missing valid password"})
    }
    else {
        const sql = `INSERT into parents (name, login_name, password_hash, family_name) VALUES ($1, $2, $3, $4)`
        db.query(sql, [parent, login, hashedPW, family]).then((dbResult) => {
            res.json({success: true})
        });
    }
})

module.exports = router