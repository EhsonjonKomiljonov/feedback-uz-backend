import { DataTypes } from "sequelize";
import { Icon } from "./icon.model.js";
import { Info } from "./info.model.js";
import { sequelize } from "../utils/sequelize.js";

export const QualityCategory = sequelize.define("QualityCategory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  text_uz: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 40],
        msg: "Name in uzbek must be less than 40 characters",
      },
    },
  },
  text_ru: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 40],
        msg: "Name in russian must be less than 40 characters",
      },
    },
  },
  icon_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Icon,
      key: "id",
    },
  },
  information_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Info,
      key: "id",
    },
  },
});
