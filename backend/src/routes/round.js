const express = require("express");
const path = require("path");
const pool = require("../config/pool");
const Joi = require('joi');
const { isLoggedIn } = require('../middlewares/index')
const { isAdmin } = require('../middlewares/index')

router = express.Router();

const roundSchema = Joi.object({
    round: Joi.number().required(),
    round_desc: Joi.string().min(0),
    roundPercentage: Joi.any().optional(),
})
const editRoundSchema = Joi.object({
    r_id: Joi.number().required(),
    r_desc: Joi.string().min(0),
    roundPercentage: Joi.any().optional(),
})

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

router.get("/:uniName/:facName/:round/edit", async function (req, res, next) {
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

        selectRound[0][0].percentage = []

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

        selectRoundGat[0].map(val => {
            val.subject = 'gat'
            val.update = true
            selectRound[0][0].percentage.push(val)
        })
        selectRoundPat[0].map(val => {
            val.subject = "pat"
            val.update = true
            selectRound[0][0].percentage.push(val)
        })
        selectRoundSub[0].map(val => {
            val.subject = "sub"
            val.update = true
            selectRound[0][0].percentage.push(val)
        })
        selectRoundOnet[0].map(val => {
            val.subject = "onet"
            val.update = true
            selectRound[0][0].percentage.push(val)
        })



        res.send({
            round: selectRound[0][0]
        })

        conn.commit()

    } catch (e) {
        res.status(400).send(e)
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.post("/:uniName/:facName/round/add", isLoggedIn, isAdmin, async function (req, res, next) {
    try {
        await roundSchema.validateAsync(req.body, { abortEarly: false })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }

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

router.put("/:uniName/:facName/:round/edit", isLoggedIn, isAdmin, async function (req, res, next) {
    try {
        await editRoundSchema.validateAsync(req.body, { abortEarly: false })
    } catch (error) {
        return res.status(400).send(error)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {

        let gpax = req.body.roundPercentage.find(type => type.subject == 'GPAX')

        if (gpax === undefined) {
            gpax = null
        }
        await conn.query("update round set r_gpax = ?, r_desc = ? where r_id = ?", [
            gpax, req.body.r_desc, req.body.r_id
        ])

        req.body.roundPercentage.map(async percent => {
            let type = percent.subject
            let subject = percent.type
            let percentage = percent.percentage
            let isUpdate = percent.update

            if (!isUpdate) {
                if (type == "onet") {
                    await conn.query('insert into r_onet (r_id, type, percentage) values (?, ?, ?)', [
                        req.body.r_id, subject, percentage
                    ])
                }
                if (type == "gat") {
                    await conn.query('insert into r_gat (r_id, type, percentage) values (?, ?, ?)', [
                        req.body.r_id, subject, percentage
                    ])
                }
                if (type == "pat") {
                    await conn.query('insert into r_pat (r_id, type, percentage) values (?, ?, ?)', [
                        req.body.r_id, subject, percentage
                    ])
                }
                if (type == "sub") {
                    await conn.query('insert into r_sub (r_id, type, percentage) values (?, ?, ?)', [
                        req.body.r_id, subject, percentage
                    ])
                }
            } else {
                if (type == "onet") {
                    await conn.query('update r_onet set percentage = ?, type = ? where no = ?', [
                        percentage, subject, percent.no
                    ])
                }
                if (type == "gat") {
                    await conn.query('update r_gat set percentage = ?, type = ? where no = ?', [
                        percentage, subject, percent.no
                    ])
                }
                if (type == "pat") {
                    await conn.query('update r_pat set percentage = ?, type = ? where no = ?', [
                        percentage, subject, percent.no
                    ])
                }
                if (type == "sub") {
                    await conn.query('update r_sub set percentage = ?, type = ? where no = ?', [
                        percentage, subject, percent.no
                    ])
                }
                if (type == "GPAX") {
                    await conn.query('update r_sub set percentage = ?, type = ? where no = ?', [
                        percentage, subject, percent.no
                    ])
                }
            }

        })
        res.send({
            isDuplicate: false,
        })



        conn.commit()

    } catch (e) {
        res.status(400).send(e)
        conn.rollback()
    } finally {
        conn.release()
    }
});

const deleteRoundSchema = Joi.object({
    r_id: Joi.number().required(),
})

router.delete("/:uniName/:facName/:round/delete", isLoggedIn, isAdmin, async function (req, res, next) {
    console.log(req.body)
    try {
        await deleteRoundSchema.validateAsync(req.body, { abortEarly: false })
    } catch (error) {
        return res.status(400).send(error)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {

        await conn.query('delete from r_gat where r_id = ?', [
            req.body.r_id
        ])
        await conn.query('delete from r_pat where r_id = ?', [
            req.body.r_id
        ])
        await conn.query('delete from r_onet where r_id = ?', [
            req.body.r_id
        ])
        await conn.query('delete from r_sub where r_id = ?', [
            req.body.r_id
        ])
        await conn.query('delete from round where r_id = ?', [
            req.body.r_id
        ])

        res.json({
            message: "delete",
        })



        conn.commit()

    } catch (e) {
        res.status(400).send(e)
        conn.rollback()
    } finally {
        conn.release()
    }
});



exports.router = router;