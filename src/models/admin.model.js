import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";

export const Admin = sequelize.define(
  "Admin",
  {
    login: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: {
          args: [5, 60],
          msg: "Login must be less than 60 characters",
        },
      },
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: {
          args: [5, 60],
          msg: "Login must be less than 200 characters and more than 5 characters",
        },
      },
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
