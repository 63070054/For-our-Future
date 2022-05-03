const express = require("express");
const Joi = require('joi')
const bcrypt = require('bcrypt');
const path = require("path")
const pool = require("../config/pool");
const { generateToken } = require("../utiils/token");
const multer = require('multer');
const { isLoggedIn } = require('../middlewares')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './src/images')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })


const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const usernameValidator = async (value, helpers) => {
    const [rows, _] = await pool.query("SELECT username FROM user WHERE username = ?", [value])
    if (rows.length > 0) {
        const message = 'This username is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const signupSchema = Joi.object({
    username: Joi.string().required().min(5).max(20).external(usernameValidator),
    password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
    email: Joi.string().optional().email().allow(null, ''),
    phone: Joi.string().optional().pattern(/0[0-9]{9}/).allow(null, ''),
    f_name: Joi.string().required().max(150),
    l_name: Joi.string().required().max(150),
    sex: Joi.string().valid('male', 'female'),
    birthDate: Joi.string().required(),
    nationality: Joi.string().optional().allow(null, ''),
    blood: Joi.string().valid('A', 'B', 'O', 'AB'),
    address: Joi.string().optional().allow(null, ''),
    imageUser: Joi.string().optional()
})

router.post('/user/register', upload.single("imageUser"), async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        console.log(err.details[0])

        if (err.details[0] === undefined) return res.status(400).send(err.details.message)

        return res.status(400).send(err.details[0].message)
    }
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = await bcrypt.hash(req.body.password, 5)
    const email = req.body.email
    const phone = req.body.phone
    const f_name = req.body.f_name
    const l_name = req.body.l_name
    const sex = req.body.sex
    const birthDate = req.body.birthDate
    const nationality = req.body.nationality
    const blood = req.body.blood
    const address = req.body.address
    try {
        if (req.file) {
            let [row, field] = await conn.query(
                'INSERT INTO user (f_name, l_name, username, password, type_user, birth_date, sex, email, nationality, blood_type, address, phone, picture, u_created_date, u_edited_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
                [
                    f_name, l_name, username, password, 'student', birthDate, sex, email, nationality, blood, address, phone, req.file.path.substring(4),
                ])
            
            console.log(row)

            await conn.query(
                'INSERT INTO student (u_id) values (?)',
                [
                    row.insertId
                ]
            )
        } else {
            let [row, field] = await conn.query(
                'INSERT INTO user (f_name, l_name, username, password, type_user, birth_date, sex, email, nationality, blood_type, address, phone, picture, u_created_date, u_edited_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
                [
                    f_name, l_name, username, password, 'student', birthDate, sex, email, nationality, blood, address, phone, 'images\\default_profile.jpg',
                ]
            )
            await conn.query(
                'INSERT INTO student (u_id) values (?)',
                [
                    row.insertId
                ]
            )
        }
        res.json({
            "message": true,
        });
        conn.commit()
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

router.post('/user/login', async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        if (err.details[0] === undefined) return res.status(400).send(err.details.message)

        return res.status(400).send(err.details[0].message)
    }
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = req.body.password

    try {

        const [users] = await conn.query(
            'SELECT * FROM user WHERE username=?',
            [username]
        )
        const user = users[0]
        if (!user) {
            throw new Error('Incorrect username')
        }


        if (!(await bcrypt.compare(password, user.password))) {
            throw new Error('Incorrect password')
        }

        const [tokens] = await conn.query(
            'SELECT * FROM tokens WHERE u_id=?',
            [user.u_id]
        )
        let token = tokens.token
        if (!token) {
            // Generate and save token into database
            token = generateToken()
            await conn.query(
                'INSERT INTO tokens (u_id, token) VALUES (?, ?)',
                [user.u_id, token]
            )
        }


        res.status(200).json({ 'token': token })
        conn.commit()
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})


router.get("/user", isLoggedIn, async function (req, res, next) {
    console.log("loginfds")
    res.json({
        user: req.user
    })
});


exports.router = router;
