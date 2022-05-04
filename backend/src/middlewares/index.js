const pool = require("../config/pool")

async function isLoggedIn(req, res, next) {
    let authorization = req.headers.authorization
    if (!authorization) {
        return 
    }


    let [part1, part2] = authorization.split(' ')

    if (part1 !== 'Bearer' || !part2) {
        return 
    }


    // Check token
    const [tokens] = await pool.query('SELECT * FROM tokens WHERE token = ?', [part2])
    const token = tokens[0]
    if (!token) {
        return 
    }
    // Set user
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let selectUser = await conn.query(`select * from user where u_id = ?`, [
            [token.u_id]
        ]);
        if (selectUser[0][0].type_user == 'student') {

            selectUser = await conn.query(`select * from user join student using (u_id) where u_id = ?`, [
                [token.u_id]
            ]);
            selectUser[0][0].editGpax = selectUser[0][0].u_gpax
            selectUser[0][0].score = {}
            selectUser[0][0].score.gat = []
            selectUser[0][0].score.pat = []
            selectUser[0][0].score.sub = []
            selectUser[0][0].score.onet = []

            const selectScoreGat = await conn.query(`select * from u_gat where u_id = ?`, [
                token.u_id
            ]);
            const selectScorePat = await conn.query(`select * from u_pat where u_id = ?`, [
                token.u_id
            ]);
            const selectScoreSub = await conn.query(`select * from u_sub where u_id = ?`, [
                token.u_id
            ]);
            const selectScoreOnet = await conn.query(`select * from u_onet where u_id = ?`, [
                token.u_id
            ]);

            selectScoreGat[0].map(gat => {
                gat.editScore = gat.score
            })
            selectScorePat[0].map(pat => {
                pat.editScore = pat.score
            })
            selectScoreSub[0].map(sub => {
                sub.editScore = sub.score
            })
            selectScoreOnet[0].map(onet => {
                onet.editScore = onet.score
            })

            selectUser[0][0].score.gat = [...selectScoreGat[0]]
            selectUser[0][0].score.pat = [...selectScorePat[0]]
            selectUser[0][0].score.sub = [...selectScoreSub[0]]
            selectUser[0][0].score.onet = [...selectScoreOnet[0]]
        }
        req.user = selectUser[0][0]
        conn.commit()

    } catch (e) {
        conn.rollback()
    } finally {
        conn.release()
    }
    next()
}

const isAdmin = (req, res, next) => {
    if (req.user.type_user == 'admin') {
        return next()
    }
    return res.status(403).send('You do not have permission to perform this action')
}


module.exports = {
    isLoggedIn,
    isAdmin
}