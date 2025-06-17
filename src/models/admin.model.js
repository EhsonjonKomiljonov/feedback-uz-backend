import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";
import { Info } from "./info.model.js";
import { Department } from "./department.model.js";

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
          args: [5, 200],
          msg: "Password must be less than 200 characters and more than 5 characters",
        },
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "super_admin", 'sub_admin'),
      allowNull: false,
    },
    information_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Info,
        key: "id",
      },
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Department,
        key: "id",
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
  {
    sequelize,
  }
);
