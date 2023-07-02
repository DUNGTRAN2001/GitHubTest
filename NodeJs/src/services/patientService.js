import db from "../models/index";
require('dotenv').config();
import emailService from "./emailService"
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorId, token,scheduleId)=>{
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}&scheduleId=${scheduleId}`
  return result
}

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if(!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName
          || !data.selectedGender || !data.address || !data.phoneNumber
          ){
            resolve({
                errCode: 1,
                errMessage : 'Missingparameter',
              });
        }
        else{
            let token = uuidv4(); 

            await emailService.sendSimpleEmail({
              receiverEmail : data?.email,
              patientName : data.fullName,
              time : data?.timeString,
              doctorName : data?.doctorName,
              language : data?.language,
              redirectLink : buildUrlEmail(data.doctorId,token,data.scheduleId)
            })
            let user =  await db.User.findOrCreate({
                where : {email : data?.email},
                defaults : {
                    email : data.email,
                    roleId : 'R3',
                    gender : data.selectedGender,
                    address : data.address,
                    firstName : data.fullName,
                    phonenumber : data.phoneNumber
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
                        timeType : data.timeType,
                        scheduleId : data.scheduleId,
                        token : token
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
  
let postVerifyBookAppointment = (data) => {
    return new Promise(async(resolve,reject)=>{
      try {
        if(!data.token || !data.doctorId ){
          resolve({
              errCode: 1,
              errMessage : 'Missingparameter',
            });
        }
      else{
        let appointment = await db.Booking.findOne({
          where : {
            doctorId : data.doctorId,
            token : data.token,
            statusId  : 'S1'
          },
          raw : false
        })
        let schedule = await db.Schedule.findOne({
          where : {
            id : data.scheduleId
          },
          raw : false
        })
        if(appointment && schedule && schedule.currentNumber < schedule.maxNumber){
        
          schedule.currentNumber += 1 
          await schedule.save()
          appointment.statusId = 'S2'
          await appointment.save()
          resolve({
            errCode : 0,
            errMessage : 'Update the appointment succeed!'
          })
        }
        else if(schedule.currentNumber == schedule.maxNumber){
            await db.Booking.destroy({
            where: { token : data.token },
          });
          resolve({
            errCode : 3,
            errMessage : 'The clinic hours are full'
          })
        }
        else{
          resolve({
            errCode : 2,
            errMessage : 'Appointment has been activated or does not exist'
          })
        }
      }
      } catch (error) {
        reject(error)
      }
    })
  }
module.exports = {
    postBookAppointment,
    postVerifyBookAppointment
}