const express = require("express");
const pool = require("../config/pool");
const Joi = require('joi');
const { isLoggedIn } = require('../middlewares/index')
const { isAdmin } = require('../middlewares/index')

router = express.Router();

const schema = Joi.object({
    faculty_name: Joi.string().required().min(1),
    faculty_desc: Joi.string().min(0),
})

router.get("/:uniName/faculty", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const selectFaculty = await conn.query(`select * from faculty join university using(uni_id) where uni_name = ?`, [req.params.uniName]);
        console.log(selectFaculty[0]);
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

router.get("/:uniName/:facName", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const selectFaculty = await conn.query(`select * from faculty join university using(uni_id) where uni_name = ? AND fac_name = ?`, [req.params.uniName, req.params.facName]);
        res.json({'faculty': selectFaculty[0]})

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.post("/:uniName/faculty/add", isLoggedIn, isAdmin, async function (req, res, next) {
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

router.put("/:uniName/:facName/edit", isLoggedIn, isAdmin, async function (req, res, next) {
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
        console.log('-----')
        console.log(faculty)
        console.log('-----')
        console.log(faculty2)
        console.log('-----')
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
router.delete("/:uniName/:facName", isLoggedIn, isAdmin, async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        console.log('1')
        const [universitys] = await conn.query(`select * from university where uni_name = ?`,
        [req.params.uniName]);
        console.log('1.1')
        const university = universitys[0]
        console.log(university.uni_id)
        console.log(req.params.facName)
        const [facultys] = await conn.query(`select * from faculty where uni_id=? AND fac_name = ?`,
        [university.uni_id, req.params.facName]);
        const faculty = facultys[0]
        console.log(faculty.fac_id)
        const [rounds] = await conn.query(`select * from round where uni_id=? AND fac_id = ?`,
        [university.uni_id, faculty.fac_id_id]);
        console.log('==')
        console.log(rounds)
        if(rounds[0]){
            const round = rounds[0]
            await conn.query(`DELETE FROM r_gat WHERE r_id = ?`, [round.r_id]);
            // console.log('111')
            await conn.query(`DELETE FROM r_lang WHERE r_id = ?`, [round.r_id]);
            // console.log('1111')
            await conn.query(`DELETE FROM r_onet WHERE r_id = ?`, [round.r_id]);
            // console.log('11111')
            await conn.query(`DELETE FROM r_pat WHERE r_id = ?`, [round.r_id]);
            // console.log('111111')
            await conn.query(`DELETE FROM r_specific WHERE r_id = ?`, [round.r_id]);
            // console.log('1111111')
            await conn.query(`DELETE FROM r_sub WHERE r_id = ?`, [round.r_id]);
            // console.log('11111111')
            await conn.query(`DELETE FROM round WHERE r_id = ?`, [round.r_id]);
            // console.log('111111111')
        }
        
        await conn.query(`DELETE FROM faculty WHERE fac_id = ? AND uni_id = ? `
        , [faculty.fac_id,university.uni_id ]);
        
        console.log('set')
        res.json({ "message": 'ok'});
        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }

});


exports.router = router;