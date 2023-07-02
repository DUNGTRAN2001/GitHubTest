
import medicationService from "../services/medicationService";

let createMedication = async(req,res)=>{
    try {
        let response = await medicationService.createMedication(req.body);
        return res.status(200).json(response);
      } catch (error) {
        console.log(error);
        return res.status(200).json({
          errCode: -1,
          message: "Error from server",
        });
      }
}
let getAllMedication = async (req, res) => {
  try {
    let response = await medicationService.getAllMedication();
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let deleteMedication = async (req, res) => {
  try {
    let response = await medicationService.deleteMedication(req.body.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let handleEditMedication = async (req, res) => {
  try {
    let data = req.body;
    let message = await medicationService.handleEditMedication(data);
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
    createMedication : createMedication,
    getAllMedication : getAllMedication,
    deleteMedication : deleteMedication,
    handleEditMedication : handleEditMedication
}