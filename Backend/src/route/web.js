import express from "express";

import userController from "../controllers/userController"
import allCodeController from '../controllers/allCodeController'
import doctorController from "../controllers/doctorController";
import patientController from '../controllers/patientController'
import specialtyController from '../controllers/specialtyController'
import clinicController from '../controllers/clinicController'
import { checkUserJWT, adminJWT, doctorJWT } from '../middleware/JWT'
let router = express.Router();

const middleware = (req, res, next) => {
    console.log('calling middleware');
    next()
}

let initWebRoutes = (app) => {
    //Admin
    router.post('/api/login', userController.handleLogin);

    router.get('/api/get-all-user', checkUserJWT, adminJWT, userController.handleGetAllUser);
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
    router.get('/api/get-list-patient-for-doctor', checkUserJWT, doctorJWT, doctorController.getListPatientForDoctor);
    router.post('/api/send-remedy', doctorController.sendRemedy);

    //Patient
    router.post('/api/patient-book-doctor', patientController.bookDoctor);
    router.post('/api/verify-book-doctor', patientController.verifyBookDoctor);

    //Specialty
    router.post('/api/create-specialty', checkUserJWT, adminJWT, specialtyController.createSpecialty);
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty', specialtyController.getDetailSpecialty);

    //Clinic
    router.post('/api/create-clinic', checkUserJWT, adminJWT, clinicController.createClinic);
    router.get('/api/get-all-clinic', clinicController.getAllClinic);
    router.get('/api/get-detail-clinic', clinicController.getDetailClinic);

    return app.use("/", router);
}

module.exports = initWebRoutes;