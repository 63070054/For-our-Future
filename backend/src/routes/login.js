const express = require("express");
const path = require("path")
const pool = require("../config/pool");
router = express.Router();
router.post("/signIn", async function (req, res, next){
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const username = req.body.username;
        const password = req.body.password;
        const [users] = await conn.query(`SELECT * FROM user where username = ?`,
        [username])
        const user = users[0];
        if(!user){
            res.json({ "message": 'noUser' });
        }
        else if(user.password !== password){
            res.json({ "message": 'wrongPass' });
        }
        else if(user.password === password){
            res.json({ "message": 'success' });
        }
        conn.commit()
    } catch (e) {
        console.log('error')
        conn.rollback()
    } finally {
        conn.release()
    }
});

exports.router = router;