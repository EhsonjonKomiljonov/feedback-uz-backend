import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { NODE_ENV } from "../../env.js";

if (NODE_ENV !== "production") {
  dotenv.config();
}

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  // username: "postgres",
  // protocol: "postgres" ,
  // database: process.env.DB,
});

try {
  await sequelize.authenticate();
  console.log("Connect db");
} catch (err) {
  console.log("Disconnect db err:" + err.message);
}
