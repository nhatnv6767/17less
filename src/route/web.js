// nơi mà mỗi 1 khi truy cập vào đường link của website thì nó sẽ vào file này đầu tiên
import express from 'express';
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'

let router = express.Router();

// app là 1 instant, 1 server là 1 ứng dụng, ta truyền ứng dụng vào bên trong server
let initWebRoutes = (app) => {
    // rest api
    router.get('/', homeController.getHomePage)
    router.get('/about', (req, res) => {
        return res.send("How about today")
    })
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);

    return app.use("/", router);
}

module.exports = initWebRoutes;