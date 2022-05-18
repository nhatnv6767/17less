import express from "express";
// lấy được các tham số từ client gửi lên
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from './config/connectDB'
import cors from 'cors'
require('dotenv').config();

// instance cua express
let app = express()

app.use(cors({ origin: true }))
//config app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)

connectDB();

let port = process.env.PORT;
app.listen(port, () => {
    //callback
    console.log("Backend NodeJS is running on the port: " + port)
})