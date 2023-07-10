import db from "../models/index";
require('dotenv').config();

  let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if(!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown){
            resolve({
                errCode: 1,
                errMessage : 'Missingparameter',
              });
        }
        else{
            await db.Specialty.create({
                name : data.name,
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
  let getAllSpecialty = (limit) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await db.Specialty.findAll({
          limit: limit,
          order: [["createdAt", "DESC"]],
        });
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
  let getDetailSpecialtyById = (id,location)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        if(!id || !location){
          resolve({
              errCode: 1,
              errMessage : 'Missingparameter',
            });
        }else{
            let data = await db.Specialty.findOne({
              where : {
                id : id
              },
              attributes : ['descriptionHTML','descriptionMarkdown']
            })
              if(data){
                  let doctorSpecialty = [];
                  if(location === 'ALL'){
                  doctorSpecialty = await db.Doctor_Infor.findAll({
                  where : {specialtyId : id},
                  attributes : ['doctorId','provinceId']
                  })
              }else{
                // find by location
                doctorSpecialty = await db.Doctor_Infor.findAll({
                  where : {
                    specialtyId : id,
                    provinceId : location
                  },
                  attributes : ['doctorId','provinceId']
                })
              }
              data.doctorSpecialty = doctorSpecialty;
              }else data = {}
              resolve({
                errCode : 0,
                data : data
              })
        }
      } catch (error) {
        reject(error);
      }
    })
  }
  let deleteSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await db.Specialty.findOne({
          where: { id: id },
        });
        if (!user) {
          resolve({
            errCode: 2,
            errMessage: "The specialty is not exist",
          });
        }
        await db.Specialty.destroy({
          where: { id: id },
        });
        resolve({
          errCode: 0,
          message: "Specialty delete success",
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  let handleEditSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.id || !data.imageBase64 || !data.name) {
          resolve({
            errCode: 2,
            errMessage: "Missing required parameters",
          });
        }
        let specialty = await db.Specialty.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (specialty) {
          specialty.name = data.name;
          specialty.image = data.imageBase64;
          specialty.descriptionHTML = data.descriptionHTML;
          specialty.descriptionMarkdown = data.descriptionMarkdown;
          await specialty.save();
          resolve({
            errCode: 0,
            message: "update the specialty success",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "Specialty not found",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };
module.exports = {
    createSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    deleteSpecialty,
    handleEditSpecialty
}