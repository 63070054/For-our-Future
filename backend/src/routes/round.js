const express = require("express");
const path = require("path");
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

        console.log(id[0].fac_id, id[0].uni_id, req.params.round)

        const selectRound = await conn.query(`select * from round where uni_id = ? and fac_id = ? and round = ?`, [
            id[0].uni_id, id[0].fac_id, req.params.round
        ]);

        selectRound[0][0].percentage = {}
        selectRound[0][0].percentage.gat = []
        selectRound[0][0].percentage.pat = []
        selectRound[0][0].percentage.onet = []
        selectRound[0][0].percentage.sub = []


        const selectRoundGat = await conn.query(`select * from r_gat where r_id = ?`, [
            selectRound[0][0].r_id
        ]);
        const selectRoundPat = await conn.query(`select * from r_pat where r_id = ?`, [
            selectRound[0][0].r_id
        ]);
        const selectRoundSub = await conn.query(`select * from r_sub where r_id = ?`, [
            selectRound[0][0].r_id
        ]);
        const selectRoundOnet = await conn.query(`select * from r_onet where r_id = ?`, [
            selectRound[0][0].r_id
        ]);

        selectRound[0][0].percentage.gat = [...selectRoundGat[0]]
        selectRound[0][0].percentage.pat = [...selectRoundPat[0]]
        selectRound[0][0].percentage.sub = [...selectRoundSub[0]]
        selectRound[0][0].percentage.onet = [...selectRoundOnet[0]]

        console.log(selectRound[0][0])

        res.send({
            round: selectRound[0][0]
        })

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.post("/:uniName/:facName/round/add", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {

        const [count, field1] = await conn.query("select count(round) as `countRound` from university join faculty using (uni_id) join round using (fac_id) where uni_name = ? and fac_name = ? and round = ?", [
            req.params.uniName, req.params.facName, req.body.round
        ])

        if (count[0].countRound > 0) {
            res.send({
                round: req.body.round,
                isDuplicate: true,
            })
        } else {

            const [id, field2] = await conn.query("select uni_id, fac_id from faculty join university using (uni_id) where uni_name = ? and fac_name = ?", [
                req.params.uniName, req.params.facName
            ])
            let gpax = req.body.roundPercentage.find(type => type.type == 'GPAX')

            if (gpax === undefined) {
                gpax = null
            }
            const insertRound = await conn.query(`insert into round (uni_id, fac_id, round, r_desc, r_gpax) values (?, ?, ?, ?, ?)`, [
                id[0].uni_id, id[0].fac_id, req.body.round, req.body.round_desc, gpax
            ]);


            req.body.roundPercentage.map(async percent => {
                let type = percent.type
                let subject = percent.subject
                let percentage = percent.percent

                if (type == "O-NET") {
                    await conn.query('insert into r_onet (r_id, type, percentage) values (?, ?, ?)', [
                        insertRound[0].insertId, subject, percentage
                    ])
                }
                if (type == "GAT") {
                    await conn.query('insert into r_gat (r_id, type, percentage) values (?, ?, ?)', [
                        insertRound[0].insertId, subject, percentage
                    ])
                }
                if (type == "PAT") {
                    await conn.query('insert into r_pat (r_id, type, percentage) values (?, ?, ?)', [
                        insertRound[0].insertId, subject, percentage
                    ])
                }
                if (type == "9 วิชาสามัญ") {
                    await conn.query('insert into r_sub (r_id, type, percentage) values (?, ?, ?)', [
                        insertRound[0].insertId, subject, percentage
                    ])
                }
                if (type == "GPAX") {
                    await conn.query('insert into r_sub (r_id, type, percentage) values (?, ?, ?)', [
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