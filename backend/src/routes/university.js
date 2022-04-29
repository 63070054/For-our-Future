const express = require("express");
const path = require("path")
const pool = require("../config/pool");
const multer = require('multer');
// var fileupload = require("express-fileupload");


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

router.post("/adduni", upload.single('univer'), async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    // console.log('-----------------')
    // console.log(req.body.uni_name)
    console.log(req.file)
    try {
        const [uni, _] = await conn.query('SELECT COUNT(uni_name) `ucount` FROM university where lower(university.uni_name) = ?', [req.body.uni_name])
        // console.log(uni[0].ucount)
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
        res.send(e)
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
// UPDATE comments SET comment=? WHERE id=?
router.put("/edituni", upload.single('resume'), async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    
    try {
        const [uni, a] = await conn.query('SELECT COUNT(uni_name) `ucount` FROM university where lower(university.uni_name) = ?', [req.body.uni_name])
        const [pro, b] = await conn.query('SELECT province_id FROM university where lower(university.uni_name) = ?', [req.body.oldname])
        console.log('---------')
        console.log(uni[0].ucount)
        console.log(pro[0].province_id)
        // console.log(req.file.path.substring(4))
        if (uni[0].ucount === 0 || pro[0].province_id != req.body.province) {
            
            // if (req.file) {
            //     console.log('file')
            //     await conn.query(`update university 
            //         set uni_name = ?,
            //         province_id = ?,
            //         file_path = ?
            //         where uni_name = ?`,
            //         [req.body.uni_name, req.body.province, req.body.oldname, req.file.path.substring(4)]);
            //     res.json({ "message": false });
            // }
            // else{
                // console.log('no file')
                await conn.query(`update university 
                    set uni_name = ?,
                    province_id = ?
                    where uni_name = ?`,
                    [req.body.uni_name, req.body.province, req.body.oldname]);
                res.json({ "message": false });
            // }
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
    // console.log(req.params.uniId)
    try {
        await conn.query(`DELETE FROM university WHERE uni_id = ?;`, [req.params.uniId]);
        res.json({ "message": 'ok' });

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
    
});

exports.router = router;
