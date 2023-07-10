
import specialtyService from "../services/specialtyService";

let createSpecialty = async(req,res)=>{
    try {
        let response = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(response);
      } catch (error) {
        console.log(error);
        return res.status(200).json({
          errCode: -1,
          message: "Error from server",
        });
      }
}
let getAllSpecialty = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 100;
  }
  try {
    let response = await specialtyService.getAllSpecialty(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getDetailSpecialtyById = async (req,res)=>{
  try {
    let response = await specialtyService.getDetailSpecialtyById(req.query.id,req.query.location);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
}
let deleteSpecialty = async (req, res) => {
  try {
    let response = await specialtyService.deleteSpecialty(req.body.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let handleEditSpecialty = async (req, res) => {
  try {
    let data = req.body;
    let message = await specialtyService.handleEditSpecialty(data);
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
    createSpecialty : createSpecialty,
    getAllSpecialty : getAllSpecialty,
    getDetailSpecialtyById : getDetailSpecialtyById,
    deleteSpecialty : deleteSpecialty,
    handleEditSpecialty : handleEditSpecialty
}