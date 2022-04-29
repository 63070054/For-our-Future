const express = require("express");
const path = require("path")
const pool = require("../config/pool");
const multer = require('multer');

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

router.get("/news", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const selectNews = await conn.query(`select * from news`);
        const selectCat = await conn.query(`select * from news_category`);

        res.json({
            news: selectNews[0],
            category: selectCat[0]
        })
        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.post("/addnews", upload.single('news'), async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    const allcate = JSON.parse(req.body.new_cat);
    const allref = JSON.parse(req.body.new_ref);
    try {
        if (req.file) {
            const [id, _] = await conn.query(`insert into news(news_title, news_desc, news_picture, news_created_date, news_created_by, news_edited_date, news_edited_by)
                values (?, ?, ?, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP, 1)`,
                [req.body.new_title, req.body.new_des, req.file.path.substring(4)]);
            console.log(id)
            for (let i = 0; i < allcate.length; i++) {
                await conn.query(`insert into news_category(category_name, news_id) values(?, ?)`, [allcate[i].category, id.insertId])
            }
            for (let i = 0; i < allref.length; i++) {
                await conn.query(`insert into news_ref(ref_name, news_id) values(?, ?)`, [allref[i].reference, id.insertId])
            }
            res.json({ "message": "add news file" });
        }
        else {
            const [id, _] = await conn.query(`insert into news(news_title, news_desc, news_picture, news_created_date, news_created_by, news_edited_date, news_edited_by)
                values (?, ?, ?, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP, 1)`,
                [req.body.new_title, req.body.new_des, 'images\\news.png']);

            for (let i = 0; i < allcate.length; i++) {
                await conn.query(`insert into news_category(category_name, news_id) values(?, ?)`, [allcate[i].category, id.insertId])
            }
            for (let i = 0; i < allref.length; i++) {
                await conn.query(`insert into news_ref(ref_name, news_id) values(?, ?)`, [allref[i].reference, id.insertId])
            }
            res.json({ "message": "add news no file" });
        }

        conn.commit()
    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.get("/news/:newsId", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const selectNews = await conn.query(`select * from news where news_id = ?`, [req.params.newsId]);
        const selectCat = await conn.query(`select * from news_category where news_id = ?`, [req.params.newsId]);
        const selectRef = await conn.query(`select * from news_ref where news_id = ?`, [req.params.newsId]);

        res.json({
            news: selectNews[0],
            category: selectCat[0],
            reference: selectRef[0]
        })
        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.get("/news/:newsId/edit", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const selectNews = await conn.query(`select * from news where news_id = ?`, [req.params.newsId]);
        const selectCat = await conn.query(`select * from news_category where news_id = ?`, [req.params.newsId]);
        const selectRef = await conn.query(`select * from news_ref where news_id = ?`, [req.params.newsId]);

        res.json({
            news: selectNews[0],
            category: selectCat[0],
            reference: selectRef[0]
        })
        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.put("/editnews", upload.single('news'), async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        console.log(req.body)
        // console.log(req.body)
        // const selectUni = await conn.query(`select * from university where uni_name = ?`, [req.params.uniName]);
        // console.log(selectUni[0])
        res.json({ "message": false });

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

exports.router = router;