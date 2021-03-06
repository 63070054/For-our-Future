const express = require("express");
const path = require("path")
const pool = require("../config/pool");
const multer = require('multer');
const Joi = require('joi');
const { isLoggedIn } = require('../middlewares/index')
const { isAdmin } = require('../middlewares/index')

router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './src/images')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

const schema = Joi.object({
    uni_name: Joi.string().required().min(1),
    province: Joi.string().required(),
    univer: Joi.string().optional(),
    resume: Joi.string().optional(),
    uniId: Joi.string().optional(),
})

router.get("/university", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {

        const selectUniversity = await conn.query(`select * from university 
        join province on university.province_id = province.province_id 
        join region on province.region_id = region.region_id`);


        res.send(selectUniversity[0])

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.get("/province", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {

        const selectPro = await conn.query(`select * from province`);

        res.json({ "province": selectPro[0] })

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.post("/adduni", isLoggedIn, isAdmin, upload.single('univer'), async function (req, res, next) {
    try {
        await schema.validateAsync(req.body, { abortEarly: false })
    } catch (error) {
        return res.status(400).json(error)
    }
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const [uni, _] = await conn.query('SELECT COUNT(uni_name) `ucount` FROM university where lower(university.uni_name) = ?', [req.body.uni_name])
        if (uni[0].ucount === 0) {

            if (req.file) {
                const [uniId, _] = await conn.query(
                    `insert into university (uni_name, province_id, u_created_date, u_created_by, u_edited_date, u_edited_by, file_path) 
                    values (?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP, ?, ?)`,
                    [req.body.uni_name, req.body.province, req.user.u_id, req.user.u_id, file.path.substring(4)]);

                await conn.query(`insert into admin_university values(?, ?, ?)`, [req.user.u_id, uniId.insertId, 'create'])

                res.json({ "message": false });
            }
            else {
                const [uniId, _] = await conn.query(
                    `insert into university (uni_name, province_id, u_created_date, u_created_by, u_edited_date, u_edited_by, file_path) 
                    values (?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP, ?, ?)`,
                    [req.body.uni_name, req.body.province, req.user.u_id, req.user.u_id, 'images\\university.png']);
                await conn.query(`insert into admin_university values(?, ?, ?)`, [req.user.u_id, uniId.insertId, 'create'])
                console.log('add')

                res.json({ "message": false });
            }

        }
        else {
            res.json({
                "message": true,
                "uni_name": req.body.uni_name
            });
        }
        conn.commit()

    } catch (e) {
        conn.rollback()
        res.send({
            e: e,
            'message': false
        })
    } finally {
        conn.release()
    }

});

router.get("/:uniName/edit", async function (req, res, next) {

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const selectUni = await conn.query(`select * from university where uni_name = ?`, [req.params.uniName]);
        res.send(selectUni[0])

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }

});

router.put("/edituni", isLoggedIn, isAdmin, upload.single('resume'), async function (req, res, next) {
    try {
        await schema.validateAsync(req.body, { abortEarly: false })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [uni, a] = await conn.query('SELECT COUNT(uni_name) `ucount` FROM university where lower(university.uni_name) = ?', [req.body.uni_name])
        const [pro, b] = await conn.query('SELECT province_id FROM university where uni_id = ?', [req.body.uniId])
        if (uni[0].ucount === 0 || pro[0].province_id != req.body.province || req.file) {
            if (req.file) {
                await conn.query(`update university set uni_name = ?, province_id = ?, u_edited_date = CURRENT_TIMESTAMP, u_edited_by = ?, file_path = ? where uni_id = ?`,
                    [req.body.uni_name, req.body.province, req.user.u_id, req.file.path.substring(4), req.body.uniId]);
                res.json({ "message": false });
            }
            else {
                await conn.query(`update university set uni_name = ?, province_id = ?, u_edited_date = CURRENT_TIMESTAMP, u_edited_by = ? where uni_id = ?`,
                    [req.body.uni_name, req.body.province, req.user.u_id, req.body.uniId]);
                res.json({ "message": false });
            }
        }
        else {
            res.json({
                "message": true,
                "uni_name": req.body.uni_name
            });
        }

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.delete("/deleteUniversity/:uniId", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const [selectFac, field1] = await conn.query(`select fac_id from faculty WHERE uni_id = ?`, [req.params.uniId]);
        selectFac.map(async fac => {
            const [selectRound, field2] = await conn.query('select r_id from round where uni_id = ? and fac_id = ?', [
                req.params.uniId, fac.fac_id
            ])
            selectRound.map(async round => {
                await conn.query(`DELETE FROM r_gat WHERE r_id = ?`, [round.r_id]);
                await conn.query(`DELETE FROM r_lang WHERE r_id = ?`, [round.r_id]);
                await conn.query(`DELETE FROM r_onet WHERE r_id = ?`, [round.r_id]);
                await conn.query(`DELETE FROM r_pat WHERE r_id = ?`, [round.r_id]);
                await conn.query(`DELETE FROM r_specific WHERE r_id = ?`, [round.r_id]);
                await conn.query(`DELETE FROM r_sub WHERE r_id = ?`, [round.r_id]);
            })
        })
        await conn.query(`DELETE FROM admin_university WHERE uni_id = ?`, [req.params.uniId]);
        await conn.query(`DELETE FROM round WHERE uni_id = ?`, [req.params.uniId]);
        await conn.query(`DELETE FROM faculty WHERE uni_id = ?`, [req.params.uniId]);
        await conn.query(`DELETE FROM university WHERE uni_id = ?`, [req.params.uniId]);

        res.json({ "message": 'ok' });
        conn.commit()

    } catch (e) {
        res.status(400).send(e)
        conn.rollback()
    } finally {
        conn.release()
    }

});

exports.router = router;
