const express = require("express");
const path = require("path")
const pool = require("../config/pool");
const multer = require('multer');
const bcrypt = require('bcrypt');
const { isLoggedIn } = require('../middlewares/index')
router.put("/profile", isLoggedIn, async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {


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
        sex = ?,
        u_edited_date = current_timestamp 
        where u_id = ? ;
        `, [req.body.f_name,
        req.body.l_name,
        req.body.email,
        req.body.phone,
        req.body.date,
        req.body.nationality,
        req.body.blood,
        req.body.add,
        req.body.sex,
        req.user.u_id]);

        res.json({ 'message': 'success' })
        conn.commit()
    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});


router.put("/profile/changePassword", isLoggedIn, async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        if (!(await bcrypt.compare(req.body.oldPassword, req.user.password))) {
                console.log('error')
                return res.status(400).json({
                    message: "Incorrect old password"
                })
        }

            await conn.query('update user set password = ? where u_id = ?', [
                await bcrypt.hash(req.body.newPassword, 5), req.user.u_id
            ])

        res.json({ 'message': 'success' })
        conn.commit()
    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.put("/profile/scoreUser", isLoggedIn, async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        // 'gpax': this.gpax,
        // 'onet': this.onet,
        // 'gat': this.gat,
        // 'pat': this.pat,
        // 'sub9': this.sub
        await conn.query(`
        update student
        set u_gpax = ?
        where u_id = ? ;
        `, [req.body.gpax, req.user.u_id]);

        req.body.onet.map(async val => {
            await conn.query('update u_onet set score = ? where no = ?', [
                val.editScore, val.no
            ]);
        })

        req.body.gat.map(async val => {
            await conn.query('update u_gat set score = ? where no = ?', [
                val.editScore, val.no
            ]);
        })

        req.body.pat.map(async val => {
            await conn.query('update u_pat set score = ? where no = ?', [
                val.editScore, val.no
            ]);
        })

        req.body.sub9.map(async val => {
            await conn.query('update u_sub set score = ? where no = ?', [
                val.editScore, val.no
            ]);
        })

        res.json({ 'message': 'success' })
        conn.commit()
    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});
exports.router = router;