import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController"
import allCodeController from '../controllers/allCodeController'
import doctorController from "../controllers/doctorController";
import patientController from '../controllers/patientController'
import specialtyController from '../controllers/specialtyController'
import clinicController from '../controllers/clinicController'
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/about', homeController.getAbout)
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayCRUD)

    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/update-crud', homeController.updateCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    //Admin
    router.post('/api/login', userController.handleLogin);

    router.get('/api/get-all-user', userController.handleGetAllUser);
    router.post('/api/create-user', userController.handleCreateUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    //AllCode
    router.get('/api/get-all-code', allCodeController.getAllCode)

    //Doctor
    router.get('/api/top-doctor-home', doctorController.getTopDoctor);
    router.get('/api/get-all-doctor', doctorController.getAllDoctor);
    router.post('/api/save-info-doctor', doctorController.saveInfoDoctor);
    router.get('/api/get-detail-doctor', doctorController.getDetailDoctor);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate);
    router.get('/api/get-detail-extra-doctor', doctorController.getDetailExtraDoctor);
    router.get('/api/get-profile-doctor', doctorController.getProfileDoctor);

    //Patient
    router.post('/api/patient-book-doctor', patientController.bookDoctor);
    router.post('/api/verify-book-doctor', patientController.verifyBookDoctor);

    //Specialty
    router.post('/api/create-specialty', specialtyController.createSpecialty);
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty', specialtyController.getDetailSpecialty);

    //Clinic
    router.post('/api/create-clinic', clinicController.createClinic);

    return app.use("/", router);
}

module.exports = initWebRoutes;