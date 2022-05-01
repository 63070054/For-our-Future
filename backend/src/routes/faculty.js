const express = require("express");
const path = require("path")
const pool = require("../config/pool");

router = express.Router();

router.get("/:uniName/faculty", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const selectFaculty = await conn.query(`select * from faculty join university using(uni_id) where uni_name = ?`, [req.params.uniName]);
        res.send({
            faculty: selectFaculty[0]
        })

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

exports.router = router;