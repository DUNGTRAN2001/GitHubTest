import db from "../models/index";
require('dotenv').config();

let createMedication = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if(!data.name || !data.description){
            resolve({
                errCode: 1,
                errMessage : 'Missingparameter',
              });
        }
        else{
            await db.Medication.create({
                name : data.name,
                description : data.description,
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
  
  let getAllMedication = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await db.Medication.findAll();
        resolve({
          errCode: 0,
          data: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  let deleteMedication = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let Medication = await db.Medication.findOne({
          where: { id: id },
        });
        if (!Medication) {
          resolve({
            errCode: 2,
            errMessage: "The Medication is not exist",
          });
        }
        await db.Medication.destroy({
          where: { id: id },
        });
        resolve({
          errCode: 0,
          message: "Medication delete success",
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  let handleEditMedication = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.id ||  !data.name || !data.description ) {
          resolve({
            errCode: 2,
            errMessage: "Missing required parameters",
          });
        }
        let Medication = await db.Medication.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (Medication) {
          Medication.name = data.name;
          Medication.description = data.description;
          await Medication.save();
          resolve({
            errCode: 0,
            message: "update the Medication success",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "Medication not found",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };
module.exports = {
    createMedication : createMedication,
    getAllMedication : getAllMedication,
    deleteMedication : deleteMedication,
    handleEditMedication : handleEditMedication
}