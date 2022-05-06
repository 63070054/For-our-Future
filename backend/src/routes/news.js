const express = require("express");
const path = require("path")
const pool = require("../config/pool");
const multer = require('multer');
const Joi = require('joi');
const { isLoggedIn } = require('../middlewares/index')
const { isAdmin } = require('../middlewares/index')

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

const schema = Joi.object({
    news_id: Joi.string().optional(),
    news_title: Joi.string().required().min(1),
    news_des: Joi.string().required().min(1),
    news_cat: Joi.string().optional(),
    news_ref: Joi.string().optional(),
    news: Joi.string().optional(),
})

router.get("/news", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const selectNews = await conn.query(`select * from news`);
        const selectCat = await conn.query(`select * from news_category`);

        selectNews[0].map(news => {
            news['category_name'] = []
            selectCat[0].map(cate => {
                if (news.news_id == cate.news_id) {
                    news['category_name'].push(cate)
                }
            })
        })

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



router.post("/addnews", isLoggedIn, isAdmin, upload.single('news'), async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    const allcate = JSON.parse(req.body.news_cat);
    const allref = JSON.parse(req.body.news_ref);
    try {

        var id
        
        if (req.file) {
            [id, _] = await conn.query(`insert into news(news_title, news_desc, news_picture, news_created_date, news_created_by, news_edited_date, news_edited_by)
                values (?, ?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP, ?)`,
                [req.body.news_title, req.body.news_des, req.file.path.substring(4), req.user.u_id, req.user.u_id]);
            // console.log(id)
            for (let i = 0; i < allcate.length; i++) {
                await conn.query(`insert into news_category(category_name, news_id) values(?, ?)`, [allcate[i].category, id.insertId])
            }
            for (let i = 0; i < allref.length; i++) {
                await conn.query(`insert into news_ref(ref_name, news_id) values(?, ?)`, [allref[i].reference, id.insertId])
            }
            res.json({ "message": "add news file" });
        }
        else {
            [id, _] = await conn.query(`insert into news(news_title, news_desc, news_picture, news_created_date, news_created_by, news_edited_date, news_edited_by)
                values (?, ?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP, ?)`,
                [req.body.news_title, req.body.news_des, 'images\\news.png', req.user.u_id, req.user.u_id]);

            for (let i = 0; i < allcate.length; i++) {
                await conn.query(`insert into news_category(category_name, news_id) values(?, ?)`, [allcate[i].category, id.insertId])
            }
            for (let i = 0; i < allref.length; i++) {
                await conn.query(`insert into news_ref(ref_name, news_id) values(?, ?)`, [allref[i].reference, id.insertId])
            }
            res.json({ "message": "add news no file" });
        }

        await conn.query(`insert into admin_news values(?, ?, ?)`, [req.user.u_id, id.insertId, 'create'])

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
        console.log('edit')
        const selectNews = await conn.query(`select * from news where news_id = ?`, [req.params.newsId]);
        const selectCat = await conn.query(`select * from news_category where news_id = ?`, [req.params.newsId]);
        const selectRef = await conn.query(`select * from news_ref where news_id = ?`, [req.params.newsId]);

        selectCat[0].map(cate => {
            cate['update'] = true
        })
        selectRef[0].map(ref => {
            ref['update'] = true
        })
        conn.commit()
        res.json({
            news: selectNews[0],
            category: selectCat[0],
            reference: selectRef[0]
        })


    } catch (e) {
        conn.rollback()
        res.send('hello')
    } finally {
        conn.release()
    }
});

router.put("/editnews", isLoggedIn, isAdmin, upload.single('news'), async function (req, res, next) {
    try {
        await schema.validateAsync(req.body, { abortEarly: false })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    const allcate = JSON.parse(req.body.news_cat);
    const allref = JSON.parse(req.body.news_ref);
    try {
        if (req.file) {
            await conn.query(`update news 
                set news_title = ?,
                    news_desc = ?,
                    news_picture = ?,
                    news_edited_date = CURRENT_TIMESTAMP,
                    news_edited_by = ?
                    where news_id = ?`,
                [req.body.news_title, req.body.news_des, req.file.path.substring(4), req.user.u_id, req.body.news_id]);
        }
        else {
            await conn.query(`UPDATE news
                SET news_title = ?,
                    news_desc = ?,
                    news_edited_date = CURRENT_TIMESTAMP,
                    news_edited_by = ?
                    WHERE news_id = ?`,
                [req.body.news_title, req.body.news_des, req.user.u_id, req.body.news_id]);
        }

        allcate.map(async cate => {
            if (cate.update) {
                await conn.query(`update news_category set category_name = ? where category_no = ?`, [cate.category_name, cate.category_no])
            } else {
                await conn.query(`insert into news_category(category_name, news_id) values(?, ?)`, [cate.category_name, req.body.news_id])
            }
        });
        allref.map(async ref => {
            if (ref.update) {
                await conn.query(`update news_ref set ref_name = ? where ref_no = ?`, [ref.ref_name, ref.ref_no])
            } else {
                await conn.query(`insert into news_ref(ref_name, news_id) values(?, ?)`, [ref.ref_name, req.body.news_id])
            }
        })
        res.json({ "message": 'update' });

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});

router.delete("/deleteNews/:newsId", async function (req, res, next) {
    console.log('del test')
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {

        await conn.query(`DELETE FROM news_category WHERE news_id = ?`, [req.params.newsId]);
        await conn.query(`DELETE FROM news_ref WHERE news_id = ?`, [req.params.newsId]);
        await conn.query(`DELETE FROM admin_news WHERE news_id = ?`, [req.params.newsId]);
        await conn.query(`DELETE FROM news WHERE news_id = ?`, [req.params.newsId]);
        console.log('del success')
        res.json({ "message": 'ok' });
        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }

});

exports.router = router;