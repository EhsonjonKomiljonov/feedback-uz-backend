import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";
import { Info } from "./info.model.js";

export const ClientFeedback = sequelize.define("ClientFeedback", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 100],
        msg: "name must be less than 100 characters",
      },
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 100],
        msg: "phone must be less than 100 characters",
      },
      is: {
        args: [/^\+?\d{9,15}$/],
        msg: "phone is invalid",
      },
    },
  },
  client_comment: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 300],
        msg: "client_comment must be less than 200 characters",
      },
    },
  },
  manager_comment: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [0, 300],
        msg: "manager_comment must be less than 200 characters",
      },
    },
  },
  reply_comment: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [0, 300],
        msg: "reply_comment must be less than 200 characters",
      },
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  status: {
    type: DataTypes.ENUM(["served", "not_served"]),
    allowNull: false,
    defaultValue: "not_served",
  },
  type: {
    type: DataTypes.ENUM(["offer", "complaint", "review"]),
    allowNull: false,
  },
  file: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 200],
        msg: "file path must be less than 200 characters",
      },
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
