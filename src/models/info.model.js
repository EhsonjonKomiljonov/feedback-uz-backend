import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";

export const Info = sequelize.define("Info", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  republic_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Republics",
      key: "id",
    },
    validate: {
      isInt: true,
      notNull: { msg: "Republic ID is required" },
    },
  },
  region_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Regions",
      key: "id",
    },
    validate: {
      isInt: true,
      notNull: { msg: "Region ID is required" },
    },
  },
  city_uz: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: { args: [1, 100], msg: "city_uz must be 1 to 100 characters" },
    },
  },
  city_ru: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: { args: [1, 100], msg: "city_ru must be 1 to 100 characters" },
    },
  },
  organization: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: { args: [1, 100], msg: "Organization must be 1 to 150 characters" },
    },
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: { args: [1, 100], msg: "Location must be 1 to 200 characters" },
    },
  },
  additional_info_uz: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: { args: [0, 200], msg: "Must be less than 200 characters" },
    },
  },
  additional_info_ru: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: { args: [0, 200], msg: "Must be less than 200 characters" },
    },
  },
  description_uz: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: { args: [0, 200], msg: "Must be less than 500 characters" },
    },
  },
  description_ru: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: { args: [0, 200], msg: "Must be less than 500 characters" },
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: { args: [1, 200], msg: "Address must be 1 to 250 characters" },
    },
  },
  wi_fi: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: { args: [0, 50], msg: "Wi-Fi must be less than 100 characters" },
    },
  },
  telegram: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: { msg: "Telegram must be a valid URL" },
    },
  },
  instagram: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: { msg: "Instagram must be a valid URL" },
    },
  },
  service: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      customCheck(value) {
        const num = BigInt(value);
        if (num <= 0n || num >= 100n) {
          throw new Error("Value must be between 1 and 100");
        }
      },
    },
  },
  menu: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  files: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    validate: {
      notNull: { msg: "File list is required" },
      isArrayLengthValid(value) {
        if (!Array.isArray(value) || value.length === 0 || value.length > 5) {
          throw new Error("You must provide between 1 and 5 files");
        }
      },
    },
  },
  phone: {
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
