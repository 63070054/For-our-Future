const express = require("express");
const pool = require("../config/pool");

router = express.Router();

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


router.get("/recommendCamps", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {

        const selectCat = await conn.query(`select * from news_category join news using (news_id) where category_name = 'ค่าย'`);

        res.json({
            recommendCamps: selectCat[0]
        })
        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.get("/latestNews", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const selectNews = await conn.query(`select * from news order by news_created_by desc limit 5`);
        res.json({
            news: selectNews[0]
        })
        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

exports.router = router;