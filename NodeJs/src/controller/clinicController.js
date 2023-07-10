
import clinicService from "../services/clinicService";

let createClinic = async(req,res)=>{
    try {
        let response = await clinicService.createClinic(req.body);
        return res.status(200).json(response);
      } catch (error) {
        console.log(error);
        return res.status(200).json({
          errCode: -1,
          message: "Error from server",
        });
      }
}
let getAllClinic = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 100;
  }
  try {
    let response = await clinicService.getAllClinic(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getDetailClinicById = async (req,res)=>{
  try {
    let response = await clinicService.getDetailClinicById(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
}
let deleteClinic = async (req, res) => {
  try {
    let response = await clinicService.deleteClinic(req.body.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let handleEditClinic = async (req, res) => {
  try {
    let data = req.body;
    let message = await clinicService.handleEditClinic(data);
    return res.status(200).json(message);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
module.exports = {
    createClinic : createClinic,
    getAllClinic : getAllClinic,
    getDetailClinicById : getDetailClinicById,
    deleteClinic : deleteClinic,
    handleEditClinic : handleEditClinic,
}