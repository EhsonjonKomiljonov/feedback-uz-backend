import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize({
  username: "postgres",
  dialect: "postgres",
  database: process.env.DB,
  password: process.env.DB_PASS,
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("Connect db");
} catch (err) {
  console.log("Disconnect db err:" + err.message);
}
