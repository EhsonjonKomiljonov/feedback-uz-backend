import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";
import { PanelCategory } from "./panel_category.model.js";

export const Icon = sequelize.define("Icons", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  file: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 100],
        msg: "file path must be less than 100 characters",
      },
    },
  },
  panel_category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PanelCategory,
      key: "id",
    },
  },
});
