const express = require("express");
const path = require("path")
const pool = require("../config/pool");
const multer = require('multer');
const { isLoggedIn } = require('../middlewares/index')
router.put("/profile", isLoggedIn, async function (req, res, next) {
    console.log('edit score user')
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        // [users] = await conn.query(`select `)
        // username: '',
        // f_name: '',
        // l_name:'',
        // email:'',
        // phone:'',
        // date: '',
        // nationlity: '',
        // blood:'',
        // add:'',
        // sex: ''
        console.log(req.user)
        await conn.query(`
        update user
        set f_name = ?,
        l_name = ?,
        email = ?,
        phone = ?,
        birth_date = ?,
        nationality = ?
        ,blood_type = ?
        ,address = ?,
        sex = ?
        where u_id = ? ;
        `, [req.body.f_name,
            req.body.l_name,
            req.body.email,
            req.body.phone,
            req.body.date,
            req.body.nationlity,
            req.body.blood,
            req.body.add,
            req.body.sex, 
            req.user.u_id]);

        res.json({ 'message': 'success' })
        conn.commit()
    } catch (e) {
        console.log('1')
        conn.rollback()
    } finally {
        console.log('end')
        conn.release()
    }
});
router.put("/profile/scoreUser", isLoggedIn, async function (req, res, next) {
    console.log('edit score user')
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        // 'gpax': this.gpax,
        // 'onet': this.onet,
        // 'gat': this.gat,
        // 'pat': this.pat,
        // 'sub9': this.sub
        console.log(req.user.u_id)
        await conn.query(`
        update student
        set u_gpax = ?
        where u_id = ? ;
        `, [req.body.gpax, req.user.u_id]);

        req.body.onet.map(async val => {
            console.log(val)
            await conn.query('update u_onet set score = ? where no = ?', [
                val.editScore, val.no
            ]);
        })

        req.body.gat.map(async val => {
            console.log(val)
            await conn.query('update u_gat set score = ? where no = ?', [
                val.editScore, val.no
            ]);
        })

        req.body.pat.map(async val => {
            console.log(val)
            await conn.query('update u_pat set score = ? where no = ?', [
                val.editScore, val.no
            ]);
        })

        req.body.sub9.map(async val => {
            console.log(val)
            await conn.query('update u_sub set score = ? where no = ?', [
                val.editScore, val.no
            ]);
        })

        res.json({ 'message': 'success' })
        conn.commit()
    } catch (e) {
        console.log('1')
        conn.rollback()
    } finally {
        console.log('end')
        conn.release()
    }
});
exports.router = router;