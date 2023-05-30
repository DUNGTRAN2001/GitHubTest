"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here (mối quan hệ)
      Schedule.belongsTo(models.Allcode, {
        foreignKey: "timeType",//(cột bên table sechedule)
        targetKey: "keyMap", //(cột bên table AllCode)
        as: "timeTypeData",
      });
    }
  }
  Schedule.init(
    {
      // id: DataTypes.INTEGER,
      currentNumber: DataTypes.INTEGER,
      maxNumber: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
