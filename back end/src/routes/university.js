const express = require("express");
const path = require("path")
const pool = require("../config/pool");

router = express.Router();

router.get("/university", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        
        const selectUniversity = await conn.query("select * from university");

        console.log(selectUniversity[0])

        res.send(selectUniversity[0])

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

exports.router = router;
