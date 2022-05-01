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

router.get("/:uniName/:facName/:round", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {

        const [id, field2] = await conn.query("select uni_id, fac_id from faculty join university using (uni_id) where uni_name = ? and fac_name = ?", [
            req.params.uniName, req.params.facName
        ])

        const selectRound = await conn.query(`select * from round where uni_id = ? and fac_id = ? and round = ?`, [
            id[0].fac_id, id[0].uni_id, req.params.round
        ]);
        // id[0].uni_id, id[0].fac_id,
        const selectRoundGat = await conn.query(`select * from r_gat where r_id`, [
            selectRound[0][0].r_id
        ]);

        selectRound[0]

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

router.post("/round/add", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {

        const [count, field1] = await conn.query("select count(round) as `countRound` from university join faculty using (uni_id) join round using (fac_id) where uni_name = ? and fac_name = ? and round = ?", [
            req.body.uniName, req.body.facName, req.body.round
        ])

        if (count[0].countRound > 0) {
            res.send({
                round: req.body.round,
                isDuplicate: true,
            })
        } else {

            const [id, field2] = await conn.query("select uni_id, fac_id from faculty join university using (uni_id) where uni_name = ? and fac_name = ?", [
                req.body.uniName, req.body.facName
            ])

            const insertRound = await conn.query(`insert into round (uni_id, fac_id, round, r_desc) values (?, ?, ?, ?)`, [
                id[0].uni_id, id[0].fac_id, req.body.round, req.body.round_desc
            ]);

            req.body.roundPercentage.map(async percent => {
                let type = percent.type
                let subject = percent.subject
                let percentage = percent.percent

                if (type == "O-NET") {
                    await conn.query('insert into r_onet (r_id, r_onet_type, r_onet_percentage) values (?, ?, ?)', [
                        insertRound[0].insertId, subject, percentage
                    ])
                }
                if (type == "GAT") {
                    await conn.query('insert into r_gat (r_id, r_gat_type, r_gat_percentage) values (?, ?, ?)', [
                        insertRound[0].insertId, subject, percentage
                    ])
                }
                if (type == "PAT") {
                    await conn.query('insert into r_pat (r_id, r_pat_type, r_pat_percentage) values (?, ?, ?)', [
                        insertRound[0].insertId, subject, percentage
                    ])
                }
                if (type == "9 วิชาสามัญ") {
                    await conn.query('insert into r_sub (r_id, r_sub_type, r_sub_percentage) values (?, ?, ?)', [
                        insertRound[0].insertId, subject, percentage
                    ])
                }
                
            })
            res.send({
                isDuplicate: false,
            })
        }



        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

exports.router = router;