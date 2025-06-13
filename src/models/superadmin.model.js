import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";

export const SuperAdmin = sequelize.define(
  "SuperAdmin",
  {
    login: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);
