import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";
import { Employee } from "./employee.model.js";

export const EmployeeReviews = sequelize.define("EmployeeReviews", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  client_comment: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      len: {
        args: [0, 200],
        msg: "client_comment must be less than 200 characters",
      },
    },
  },
  client_phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: {
        args: [/^\+?\d{9,15}$/],
        msg: "Phone number is invalid",
      },
    },
  },
});
