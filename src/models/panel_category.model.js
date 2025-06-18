import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";

export const PanelCategory = sequelize.define("PanelCategory", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  category_name: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      len: {
        args: [0, 200],
        msg: "client_comment must be less than 200 characters",
      },
    },
  },
});
