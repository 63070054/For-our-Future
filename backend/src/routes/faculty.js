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

router.post("/:uniName/faculty/add", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const [facultys] = await conn.query(`select * from faculty join university using(uni_id) where uni_name = ? AND fac_name = ?`,
         [req.params.uniName, req.body.faculty_name]);
        const faculty = facultys[0]
        console.log(faculty)
        if(faculty){
            res.json({'message':'alredyHave'})
        }
        else{
            console.log('test2')
            const [university] = await conn.query(`SELECT * FROM university where uni_name = ?`,
            [req.params.uniName]);
            const uni = university[0];
            console.log(uni)
            console.log('----')
            const [rows, fieldn] = await conn.query(`INSERT INTO faculty(uni_id, fac_name, fac_desc)
            values(?,?,?)`,
             [
                uni.uni_id, req.body.faculty_name, req.body.faculty_desc
             ]);
             console.log('+++')
             console.log(rows[0])
            res.json({'message': 'success'})
        }

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

exports.router = router;