const express = require("express");
const path = require("path")
const pool = require("../config/pool");
const multer = require('multer');
var fileupload = require("express-fileupload");


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
router.post("/adduni", upload.single('resume'), async function (req, res, next) {
    // const { uni_name, province } = req.body
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    console.log('-----------------')
    console.log(req.body.uni_name)
    console.log(req.file)
    try {
        const [rows, _] = await conn.query('SELECT COUNT(uni_name) `ucount` FROM university where lower(university.uni_name) = ?', [req.body.uni_name])
        // console.log(rows[0].ucount)
        if (rows[0].ucount === 0) {
            if (req.file) {
                await conn.query(
                    `insert into university (uni_name, province_id, u_created_date, u_created_by, u_edited_date, u_edited_by, file_path) 
                    values (?, ?, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP, 1, ?)`,
                    [req.body.uni_name, req.body.province, req.file.path]);
                res.json({ "message": false });
            }
            else{
                await conn.query(
                    `insert into university (uni_name, province_id, u_created_date, u_created_by, u_edited_date, u_edited_by, file_path) 
                    values (?, ?, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP, 1, 'resume-1650981902151.png')`,
                    [req.body.uni_name, req.body.province]);
                res.json({ "message": false });
            }

        }
        else {
            console.log('no add')
            // res.redirect('http://localhost:3000/university')
            res.json({
                "message": true,
                "uni_name": uni_name
            });

        }
        console.log("---------------------------------")
        conn.commit()

    } catch (e) {
        conn.rollback()
        res.send(e)
    } finally {
        conn.release()
    }

});

exports.router = router;
