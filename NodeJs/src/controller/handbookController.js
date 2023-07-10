
import handbookService from "../services/handbookService"

let createHandBook = async(req,res)=>{
    try {
        let response = await handbookService.createHandBook(req.body);
        return res.status(200).json(response);
      } catch (error) {
        console.log(error);
        return res.status(200).json({
          errCode: -1,
          message: "Error from server",
        });
      }
}
let getAllHandBook = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 100;
  }
  try {
    
    let response = await handbookService.getAllHandBook(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getDetailHandBookById = async (req,res)=>{
  try {
    let response = await handbookService.getDetailHandBookById(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
}
let deleteHandBook = async (req, res) => {
  try {
    let response = await handbookService.deleteHandBook(req.body.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log("lỗi", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let handleEditHandBook = async (req, res) => {
  try {
    let data = req.body;
    let message = await handbookService.handleEditHandBook(data);
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
    createHandBook : createHandBook,
    getAllHandBook : getAllHandBook,
    getDetailHandBookById : getDetailHandBookById,
    deleteHandBook : deleteHandBook,
    handleEditHandBook : handleEditHandBook,
}