const express = require("express");
const path = require("path")
const pool = require("../config/pool");



router.get("/user", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {

        const selectUser = await conn.query(`select * from user join student using (u_id) where u_id = ?`, [
            1
        ]);

        selectUser[0][0].score = {}
        selectUser[0][0].score.gat = []
        selectUser[0][0].score.pat = []
        selectUser[0][0].score.sub = []
        selectUser[0][0].score.onet = []


        const selectScoreGat = await conn.query(`select * from u_gat where u_id = ?`, [
            1
        ]);
        const selectScorePat = await conn.query(`select * from u_pat where u_id = ?`, [
            1
        ]);
        const selectScoreSub = await conn.query(`select * from u_sub where u_id = ?`, [
            1
        ]);
        const selectScoreOnet = await conn.query(`select * from u_onet where u_id = ?`, [
            1
        ]);

        selectUser[0][0].score.gat = [...selectScoreGat[0]]
        selectUser[0][0].score.pat = [...selectScorePat[0]]
        selectUser[0][0].score.sub = [...selectScoreSub[0]]
        selectUser[0][0].score.onet = [...selectScoreOnet[0]]


        res.json({
            user: selectUser[0]
        })

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});


exports.router = router;
