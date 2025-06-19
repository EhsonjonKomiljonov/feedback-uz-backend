import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(process.env.DB_HOST, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // required for Railway
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
