import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";

export const EmployeesCategories = sequelize.define("EmployeesCategories", {
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
        msg: "Category Name in uzbek must be less than 50 characters",
      },
    },
  },
  category_name_ru: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 50],
        msg: "Category Name in russian must be less than 50 characters",
      },
    },
  },
  information_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Infos",
      key: "id",
    },
    validate: {
      isInt: true,
      notNull: { msg: "Information ID is required" },
    },
  }
})