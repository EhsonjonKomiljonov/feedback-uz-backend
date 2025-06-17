import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";
import { Info } from "./info.model.js";

export const Department = sequelize.define("Department", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 100],
        msg: "Name must be less than 100 characters",
      },
    },
  },
  additional_info_uz: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [0, 200],
        msg: "additional_info_uz must be less than 200 characters",
      },
    },
  },
  additional_info_ru: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [0, 200],
        msg: "additional_info_ru must be less than 200 characters",
      },
    },
  },
  information_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Info,
      key: "id",
    },
  }
});
