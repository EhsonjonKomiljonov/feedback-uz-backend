import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";

export const Admin = sequelize.define(
  "Admin",
  {
    login: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "superadmin"),
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);
