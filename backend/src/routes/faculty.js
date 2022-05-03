const express = require("express");
const path = require("path")
const pool = require("../config/pool");
const Joi = require('joi');
const bcrypt = require('bcrypt');

router = express.Router();

const schema = Joi.object({
    faculty_name: Joi.string().required().min(1),
    faculty_desc: Joi.string().required().min(1),
})

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
    try {
        await schema.validateAsync(req.body, {abortEarly: false})
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const [facultys] = await conn.query(`select * from faculty join university using(uni_id) where uni_name = ? AND fac_name = ?`,
         [req.params.uniName, req.body.faculty_name]);
        const faculty = facultys[0]
        // console.log(faculty)
        if(faculty){
            res.json({'message':'alredyHave'})
        }
        else{
            // console.log('test2')
            const [university] = await conn.query(`SELECT * FROM university where uni_name = ?`,
            [req.params.uniName]);
            const uni = university[0];
            // console.log(uni)
            // console.log('----')
            const [rows, fieldn] = await conn.query(`INSERT INTO faculty(uni_id, fac_name, fac_desc)
            values(?,?,?)`,
             [
                uni.uni_id, req.body.faculty_name, req.body.faculty_desc
             ]);
            //  console.log('+++')
            //  console.log(rows[0])
            res.json({'message': 'success'})
        }

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.put("/:uniName/:facName/edit", async function (req, res, next) {
    try {
        await schema.validateAsync(req.body, {abortEarly: false})
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const [facultys] = await conn.query(`select * from faculty join university using(uni_id) where uni_name = ? AND fac_name = ?`,
         [req.params.uniName, req.params.facName]);
        const faculty = facultys[0]
        const [facultys2] = await conn.query(`select * from faculty join university using(uni_id) where uni_name = ? AND fac_name = ?`,
         [req.params.uniName, req.body.faculty_name]);
        const faculty2 = facultys2[0]
        console.log(faculty)
        console.log(faculty2)
        if(faculty2){
            res.json({'message':'alredyHave'})
        }
        else{
            console.log('test2')
            // const [university] = await conn.query(`SELECT * FROM university where uni_name = ?`,
            // [req.params.uniName]);
            // const uni = university[0];
            // console.log(uni)
            // console.log('----')
            const [rows, fieldn] = await conn.query(`UPDATE faculty
            SET fac_name = ?, fac_desc = ? 
            WHERE fac_id = ?`,
             [
                req.body.faculty_name, req.body.faculty_desc, faculty.fac_id
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