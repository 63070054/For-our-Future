const express = require("express");
const path = require("path")
const pool = require("../config/pool");
const multer = require('multer');
router.get("/profile", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        console.log(req.user)
        res.json({'message':'success'})
        conn.commit()
    } catch (e) {
        console.log('1')
        conn.rollback()
    } finally {
        console.log('end')
        conn.release()
    }
});
router.get("/profile/:username/scoreUser", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        console.log(req.use)
        res.json({'message':'success'})
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