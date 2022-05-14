// nơi mà mỗi 1 khi truy cập vào đường link của website thì nó sẽ vào file này đầu tiên
import express from 'express';

let router = express.Router();

// app là 1 instant, 1 server là 1 ứng dụng, ta truyền ứng dụng vào bên trong server
let initWebRoutes = (app) => {
    // rest api
    router.get('/', (req, res) => {
        return res.send("Hello world")
    })
    router.get('/about', (req, res) => {
        return res.send("How about today")
    })
    return app.use("/", router);
}

module.exports = initWebRoutes;