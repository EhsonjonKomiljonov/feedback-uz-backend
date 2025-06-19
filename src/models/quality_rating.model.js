import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";
import { QualityCategory } from "./quality_categories.model.js";

export const QualityRating = sequelize.define("QualityRating", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  client_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 100],
        msg: "client_name must be less than 100 characters",
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
        msg: "client_phone is invalid",
      },
    },
  },
  quality_category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: QualityCategory,
      key: "id",
    },
  }
});