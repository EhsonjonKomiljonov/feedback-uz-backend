import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";

export const Region = sequelize.define("Region", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name_uz: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [0, 40],
        msg: "Region Name in uzbek must be less than 40 characters",
      },
    },
  },
  name_ru: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 40],
        msg: "Region Name in russian must be less than 40 characters",
      },
    },
  },
});
