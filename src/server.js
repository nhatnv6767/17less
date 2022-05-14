import express from "express";
// lấy được các tham số từ client gửi lên
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"

// instance cua express
let app = express()

//config app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
viewEngine(app)
initwebRoutes(app)