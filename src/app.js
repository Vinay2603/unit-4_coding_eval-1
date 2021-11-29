const express = require("express")
const { any, short } = require("webidl-conversions")

const connect = require("./configs/db")



const jobController = require("./controllers/jobs")
const cityController = require("./controllers/citys")
const workController = require("./controllers/work_from_home")
const noticeController = require("./controllers/notice_periods")
const companyController = require("./controllers/companys")







const app = express()
app.use(express.json())


app.use("/jobs",jobController)
app.use("/citys",cityController)
app.use("/work_from_homes",workController)
app.use("/notice_periods", noticeController)
app.use("/companys",companyController)



module.exports = app













