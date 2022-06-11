// nơi mà mỗi 1 khi truy cập vào đường link của website thì nó sẽ vào file này đầu tiên
import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";

let router = express.Router();

// app là 1 instant, 1 server là 1 ứng dụng, ta truyền ứng dụng vào bên trong server
let initWebRoutes = (app) => {
    // rest api
    router.get("/", homeController.getHomePage);
    router.get("/about", (req, res) => {
        return res.send("How about today");
    });
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displayGetCRUD);
    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/put-crud", homeController.putCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);

    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.post("/api/create-new-user", userController.handleCreateNewUser);
    router.put("/api/edit-user", userController.handleEditUser);
    router.delete("/api/delete-user", userController.handleDeleteUser);
    router.get("/api/allcode", userController.getAllCode);

    router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
    router.get("/api/get-all-doctors", doctorController.getAllDoctors);
    router.post("/api/save-infor-doctors", doctorController.postInforDoctor);
    router.get(
        "/api/get-detail-doctor-by-id",
        doctorController.getDetailDoctorById
    );
    router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);

    return app.use("/", router);
};

module.exports = initWebRoutes;
