import { sequelize } from "../utils/sequelize.js";
import { Republic } from "./republic.model.js";
import { Region } from "./region.model.js";
import { Info } from "./info.model.js";
import { EmployeeCategory } from "./employee_category.model.js";

Info.belongsTo(Region, { foreignKey: "region_id" });
Info.belongsTo(Republic, { foreignKey: "republic_id" });
EmployeeCategory.belongsTo(Info, { foreignKey: "information_id" });

await sequelize.sync({ alter: true });
