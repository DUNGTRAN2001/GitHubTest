import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import doctorController from "../controller/doctorController";
import patientController from "../controller/patientController";
import specialtyController from "../controller/specialtyController"
import clinicController from "../controller/clinicController"
import handbookController from "../controller/handbookController"
import medicationController from "../controller/MedicationController"
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCrud);
  router.get("/edit-crud", homeController.getEditCrud);
  router.post("/put-crud", homeController.putEditCrud);
  router.get("/delete-crud", homeController.deleteCrud);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUser);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-infor-doctor", doctorController.postInforDoctor);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );
  router.get("/api/get-extra-infor-doctor-by-id", doctorController.getExtraInforDotorById);
  router.get("/api/get-profile-doctor-by-id", doctorController.getProfileDotorById);

  router.get("/api/get-list-patient-for-doctor", doctorController.getListPatientForDoctor);
  router.post("/api/send-redemy", doctorController.sendRedemy);

  
  // rest api
  router.post("/api/patient-book-appoitntment",patientController.postBookAppointment);
  router.post("/api/verify-book-appointment",patientController.postVerifyBookAppointment);

  router.post("/api/create-new-specialty",specialtyController.createSpecialty);
  router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
  router.get("/api/get-detail-specialty-by-id", specialtyController.getDetailSpecialtyById);
  router.delete("/api/delete-specialty", specialtyController.deleteSpecialty);
  router.put("/api/edit-specialty", specialtyController.handleEditSpecialty);

  router.post("/api/create-new-clinic",clinicController.createClinic);
  router.get("/api/get-all-clinic", clinicController.getAllClinic);
  router.get("/api/get-detail-clinic-by-id", clinicController.getDetailClinicById);
  router.delete("/api/delete-clinic", clinicController.deleteClinic);
  router.put("/api/edit-clinic", clinicController.handleEditClinic);

  router.post("/api/create-new-handbok",handbookController.createHandBook);
  router.get("/api/get-all-handbook", handbookController.getAllHandBook);
  router.get("/api/get-detail-handbook-by-id", handbookController.getDetailHandBookById);
  router.delete("/api/delete-handbook", handbookController.deleteHandBook);
  router.put("/api/edit-handbook", handbookController.handleEditHandBook);

  router.post("/api/create-new-medication",medicationController.createMedication);
  router.get("/api/get-all-medication", medicationController.getAllMedication);
  router.delete("/api/delete-medication", medicationController.deleteMedication);
  router.put("/api/edit-medication", medicationController.handleEditMedication);
  return app.use("/", router);
};

module.exports = initWebRoutes;
