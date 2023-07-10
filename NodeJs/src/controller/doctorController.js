import doctorService from "../services/doctorService";
let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 100;
  }
  try {
    let response = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let postInforDoctor = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getDetailDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json(infor);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let response = await doctorService.bulkCreateSchedule(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getScheduleByDate = async (req, res) => {
  try {
    let response = await doctorService.getScheduleByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getExtraInforDotorById = async (req, res) => {
  try {
    let response = await doctorService.getExtraInforDotorById(req.query.doctorId);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getProfileDotorById = async (req, res) => {
  try {
    let response = await doctorService.getProfileDotorById(req.query.doctorId);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getListPatientForDoctor = async(req,res)=>{
  try {
    let response = await doctorService.getListPatientForDoctor(req.query.doctorId,req.query.date);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
}
let sendRedemy = async(req,res)=>{
  try {
    let response = await doctorService.sendRedemy(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
}
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInforDoctor: postInforDoctor,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforDotorById : getExtraInforDotorById,
  getProfileDotorById : getProfileDotorById,
  getListPatientForDoctor : getListPatientForDoctor,
  sendRedemy : sendRedemy
};
