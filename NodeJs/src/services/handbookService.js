import db from "../models/index";
require('dotenv').config();

let createHandBook = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if(!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown){
            resolve({
                errCode: 1,
                errMessage : 'Missingparameter',
              });
        }
        else{
            await db.HandBook.create({
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
  
  let getAllHandBook = (limit) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await db.HandBook.findAll(
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
  let getDetailHandBookById = (id)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        if(!id){
          resolve({
              errCode: 1,
              errMessage : 'Missingparameter',
            });
        }else{
            let data = await db.HandBook.findOne({
              where : {
                id : id
              },
              attributes : ['name','descriptionHTML','descriptionMarkdown']
            })
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
  let deleteHandBook = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let HandBook = await db.HandBook.findOne({
          where: { id: id },
        });
        if (!HandBook) {
          resolve({
            errCode: 2,
            errMessage: "The HandBook is not exist",
          });
        }
        await db.HandBook.destroy({
          where: { id: id },
        });
        resolve({
          errCode: 0,
          message: "HandBook delete success",
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  let handleEditHandBook = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.id || !data.imageBase64 || !data.name) {
          resolve({
            errCode: 2,
            errMessage: "Missing required parameters",
          });
        }
        let HandBook = await db.HandBook.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (HandBook) {
          HandBook.name = data.name;
          HandBook.image = data.imageBase64;
          HandBook.address = data.address;
          HandBook.descriptionHTML = data.descriptionHTML;
          HandBook.descriptionMarkdown = data.descriptionMarkdown;
          await HandBook.save();
          resolve({
            errCode: 0,
            message: "update the HandBook success",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "HandBook not found",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };
module.exports = {
    createHandBook,
    getAllHandBook,
    getDetailHandBookById,
    deleteHandBook,
    handleEditHandBook
}