import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js"; 
import { EmployeeCategory } from "./employee_category.model.js";
import { Department } from "./department.model.js";

export const Employee = sequelize.define("Employee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  full_name_uz: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 40],
        msg: "full_name_uz must be less than 40 characters",
      },
    },
  },
  full_name_ru: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 40],
        msg: "full_name_ru must be less than 40 characters",
      },
    },
  },
  description_uz: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 150],
        msg: "description_uz must be less than 40 characters",
      },
    },
  },
  description_ru: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 150],
        msg: "description_ru must be less than 40 characters",
      },
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  file: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "File is required" },
      len: {
        args: [1],
        msg: "Only 1 file can be uploaded at a time",
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
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: EmployeeCategory,
      key: "id",
    },
  },
});
