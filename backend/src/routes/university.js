const express = require("express");
const path = require("path")
const pool = require("../config/pool");
const multer = require('multer');
const Joi = require('joi');
const bcrypt = require('bcrypt');

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

        res.json({"province":selectPro[0]})

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.post("/adduni", upload.single('univer'), async function (req, res, next) {
    try {
        await schema.validateAsync(req.body, {abortEarly: false})
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    // console.log('-----------------')
    // console.log(req.body.uni_name)
    try {
        console.log('add')
        const [uni, _] = await conn.query('SELECT COUNT(uni_name) `ucount` FROM university where lower(university.uni_name) = ?', [req.body.uni_name])
        if (uni[0].ucount === 0) {
            if (req.file) {
                await conn.query(
                    `insert into university (uni_name, province_id, u_created_date, u_created_by, u_edited_date, u_edited_by, file_path) 
                    values (?, ?, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP, 1, ?)`,
                    [req.body.uni_name, req.body.province, req.file.path.substring(4)]);
                res.json({ "message": false });
            }
            else{
                await conn.query(
                    `insert into university (uni_name, province_id, u_created_date, u_created_by, u_edited_date, u_edited_by, file_path) 
                    values (?, ?, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP, 1, ?)`,
                    [req.body.uni_name, req.body.province, 'images\\university.png']);
                res.json({ "message": false });
            }

        }
        else {
            console.log('no add')
            res.json({"message": true,
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

router.get("/recommendUniversities", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const selectUniversities = await conn.query(`select * from university order by rand() limit 5`);
        res.json({
            recommendUniversities: selectUniversities[0]
        })
        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.get("/:uniName/edit", async function (req, res, next) {

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    // console.log(req.params.uniName)
    try {
        const selectUni = await conn.query(`select * from university where uni_name = ?`, [req.params.uniName]);
        // console.log(selectUni[0])
        res.send(selectUni[0])

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
    
});

router.put("/edituni", upload.single('resume'), async function (req, res, next) {
    try {
        await schema.validateAsync(req.body, {abortEarly: false})
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    
    try {
        const [uni, a] = await conn.query('SELECT COUNT(uni_name) `ucount` FROM university where lower(university.uni_name) = ?', [req.body.uni_name])
        const [pro, b] = await conn.query('SELECT province_id FROM university where uni_id = ?', [req.body.uniId])
        // console.log('---------')
        // console.log(uni[0].ucount)
        // console.log(req.body.uniId)
        // console.log(req.body.uni_name)
        // console.log(req.file)
        // console.log(pro[0].province_id)
        if (uni[0].ucount === 0 || pro[0].province_id != req.body.province || req.file) {
            console.log('ok')
            if (req.file) {
                console.log('file')
                await conn.query(`update university set uni_name = ?, province_id = ?, u_edited_date = CURRENT_TIMESTAMP, u_edited_by = ?, file_path = ? where uni_id = ?`,
                [req.body.uni_name, req.body.province, 1, req.file.path.substring(4), req.body.uniId]);
                res.json({ "message": false });
            }
            else{
                console.log('no file')
                await conn.query(`update university set uni_name = ?, province_id = ?, u_edited_date = CURRENT_TIMESTAMP, u_edited_by = ? where uni_id = ?`,
                    [req.body.uni_name, req.body.province, 1, req.body.uniId]);
                res.json({ "message": false });
            }
        }
        else {
            console.log('no edit')
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
    console.log(req.params.uniId)
    try {
        await conn.query(`DELETE FROM round WHERE uni_id = ?`, [req.params.uniId]);
        await conn.query(`DELETE FROM faculty WHERE uni_id = ?`, [req.params.uniId]);
        await conn.query(`DELETE FROM university WHERE uni_id = ?`, [req.params.uniId]);

        res.json({ "message": 'ok' });
        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
    
});

exports.router = router;
