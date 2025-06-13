import { sequelize } from "../utils/sequelize.js";

await sequelize.sync({ alter: true });
