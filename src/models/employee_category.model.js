import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js"; 
import { Department } from "./department.model.js";

export const EmployeeCategory = sequelize.define("EmployeesCategories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  category_name_uz: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 50],
        msg: "category_name_uz must be less than 50 characters",
      },
    },
  },
  category_name_ru: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 50],
        msg: "category_name_ru must be less than 50 characters",
      },
    },
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Department,
      key: "id",
    },
    validate: {
      isInt: true,
      notNull: { msg: "department_id is required" },
    },
  }
})