import db from "../models/index";
require('dotenv').config();

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if(!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown || !data.address){
            resolve({
                errCode: 1,
                errMessage : 'Missingparameter',
              });
        }
        else{
            await db.Clinic.create({
                name : data.name,
                address : data.address,
                descriptionHTML : data.descriptionHTML,
                descriptionMarkdown : data.descriptionMarkdown,
                image : data.imageBase64,
            })
            resolve({
                errCode : 0,
                errMessage : 'Ok'
            })
        }
        
      } catch (error) {
        reject(error);
      }
    });
  };
  
  let getAllClinic = (limit) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await db.Clinic.findAll(
          {
            limit: limit,
            order: [["createdAt", "DESC"]],
          }
        );
        if(response?.length > 0){
          response?.map(item=>{
            item.image = new Buffer(item.image, "base64").toString(
              "binary"
            );
            return item
          })
        }
        resolve({
          errCode: 0,
          data: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  let getDetailClinicById = (id)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        if(!id){
          resolve({
              errCode: 1,
              errMessage : 'Missingparameter',
            });
        }else{
            let data = await db.Clinic.findOne({
              where : {
                id : id
              },
              attributes : ['address','name','descriptionHTML','descriptionMarkdown']
            })
              if(data){
                  let doctorClinic= [];
                  doctorClinic = await db.Doctor_Infor.findAll({
                  where : {clinicId : id},
                  attributes : ['doctorId']
                  })
                  data.doctorClinic = doctorClinic;
              }else data = {}
              resolve({
                errCode : 0,
                data
              })
        }
      } catch (error) {
        reject(error);
      }
    })
  }
  let deleteClinic = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let clinic = await db.Clinic.findOne({
          where: { id: id },
        });
        if (!clinic) {
          resolve({
            errCode: 2,
            errMessage: "The clinic is not exist",
          });
        }
        await db.Clinic.destroy({
          where: { id: id },
        });
        resolve({
          errCode: 0,
          message: "Clinic delete success",
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  let handleEditClinic = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.id || !data.imageBase64 || !data.name) {
          resolve({
            errCode: 2,
            errMessage: "Missing required parameters",
          });
        }
        let clinic = await db.Clinic.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (clinic) {
          clinic.name = data.name;
          clinic.image = data.imageBase64;
          clinic.address = data.address;
          clinic.descriptionHTML = data.descriptionHTML;
          clinic.descriptionMarkdown = data.descriptionMarkdown;
          await clinic.save();
          resolve({
            errCode: 0,
            message: "update the clinic success",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "clinic not found",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };
module.exports = {
    createClinic,
    getAllClinic,
    getDetailClinicById,
    deleteClinic,
    handleEditClinic
}