const express = require("express");
const path = require("path")
const pool = require("../config/pool");

router = express.Router();

router.get("/:facId/round", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const selectRound = await conn.query(`select * from round where fac_id = ?`, [req.params.facId]);
        res.send({
            round: selectRound[0]
        })

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

exports.router = router;