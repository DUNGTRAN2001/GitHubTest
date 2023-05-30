"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Docter_clinic_specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Docter_clinic_specialty.init(
    {
      // id: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Docter_clinic_specialty",
    }
  );
  return Docter_clinic_specialty;
};
