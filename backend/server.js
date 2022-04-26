const express = require("express")
const path = require("path")
const cors = require("cors")

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs')
// set root folder for views
app.set('views', path.join(__dirname, 'views'))

// Statics
app.use(express.static(path.join(__dirname, 'static')))

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const universityRouter = require('./src/routes/university')
const facultyRouter = require('./src/routes/faculty')
const roundRouter = require('./src/routes/round')

app.use(universityRouter.router)
app.use(facultyRouter.router)
app.use(roundRouter.router)

app.listen(5000, () => {
    console.log(`Example app listening at http://localhost:5000`)
})