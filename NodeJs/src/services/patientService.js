import db from "../models/index";
require('dotenv').config();
import emailService from "./emailService"
let postBookAppointment = async(data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if(!data.email || !data.doctorId || !data.timeType || !data.date){
            resolve({
                errCode: 1,
                errMessage : 'Missingparameter',
              });
        }
        else{
            await emailService.sendSimpleEmail({
              receiverEmail : data?.email,
              patientName : 'Trần Anh Dũng',
              time : '8:00 - 9:00 Chủ nhật 30/05/2023',
              doctorName : 'Nguyễn Hữu Nguyên',
              redirectLink : 'https://www.facebook.com/'
            })
            let user =  await db.User.findOrCreate({
                where : {email : data?.email},
                defaults : {
                    email : data.email,
                    roleId : 'R3'
                }
            })
            if(user){
                await db.Booking.findOrCreate({
                    where : {patientId : user[0].id},
                    defaults : {
                        statusId : 'S1',
                        doctorId : data.doctorId,
                        patientId : user[0].id,
                        date : data.date,
                        timeType : data.timeType
                        }
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'Save infor patient success',
              });
        }
        
      } catch (error) {
        reject(error);
      }
    });
  };

module.exports = {
    postBookAppointment
}