const express = require("express");
const path = require("path")
const pool = require("../config/pool");
// const multer = require('multer');

router = express.Router();

// const storage = multer.diskStorage({
//     destination: function(req, file, callback){
//       callback(null, './src/images')
//     },
//     filename: function(req, file, callback){
//       callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
//   })
//   const upload = multer({ storage: storage })



router.get("/university", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        
        const selectUniversity = await conn.query("select * from university");

        console.log(selectUniversity[0])

        res.send(selectUniversity[0])

        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
});
// insert into user (prefix, f_name, l_name, username, password, type_user, sex, u_created_date, u_edited_date) values ('นาย', 'บูม', 'xxx', 'boom', '123456', 'student', 'male', current_timestamp, current_timestamp);
//         insert into province (province_name) values ('กรุงเทพ');
//         insert into university (uni_name, province, u_created_date, u_created_by, u_edited_date, u_edited_by) values ('KMUTT', 2, CURRENT_TIMESTAMP, 2, CURRENT_TIMESTAMP, 2);
// , upload.single('resume')
router.post("/adduni", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    
    // try {
    //     console.log(req)
    //     // const addUniversity = await conn.query(``);

    //     // console.log(addUniversity[0])

    //     // res.send(addUniversity[0])

    //     conn.commit()

    // } catch (e) {
    //     conn.rollback()
    // } finally {
    //     conn.release()
    // }
});

exports.router = router;
