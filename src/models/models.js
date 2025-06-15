import { sequelize } from "../utils/sequelize.js";
import { Republic } from "./republic.model.js";
import { Region } from "./region.model.js";
import { Info } from "./info.model.js";
import { EmployeesCategories } from "./employees_categories.model.js";

Region.hasMany(Info, { foreignKey: "region_id" });
Republic.hasMany(Info, { foreignKey: "republic_id" });
Info.hasMany(EmployeesCategories, { foreignKey: "information_id" });

await sequelize.sync({ alter: true });
