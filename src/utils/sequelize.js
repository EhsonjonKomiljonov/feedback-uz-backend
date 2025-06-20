import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { DATABASE_URL, NODE_ENV } from "../../env.js";

if (NODE_ENV !== "production") {
  dotenv.config();
}

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions:
    NODE_ENV === "production"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
});

try {
  await sequelize.authenticate();
  console.log("-------------- ✅ db Connected -------------------------------");
} catch (err) {
  console.log("Disconnect db err: " + err.message);
}
