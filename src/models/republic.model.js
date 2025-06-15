import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";

export const Republic = sequelize.define("Republic", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name_uz: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 40],
        msg: "Name in uzbek must be less than 40 characters",
      },
    },
  },
  name_ru: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 40],
        msg: "Name in russian must be less than 40 characters",
      },
    },
  },
});
