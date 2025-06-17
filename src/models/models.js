import { sequelize } from "../utils/sequelize.js";
import { Republic } from "./republic.model.js";
import { Region } from "./region.model.js";
import { Info } from "./info.model.js";
import { EmployeeCategory } from "./employee_category.model.js";
import { Employee } from "./employee.model.js";
import { Department } from "./department.model.js";
import { EmployeeReviews } from "./employee_reviews.model.js";

Info.belongsTo(Region, { foreignKey: "region_id" });
Info.belongsTo(Republic, { foreignKey: "republic_id" });

Department.belongsTo(Info, { foreignKey: "information_id" });

EmployeeCategory.belongsTo(Department, { foreignKey: "department_id" });

Employee.belongsTo(Department, { foreignKey: "department_id" });
Employee.belongsTo(EmployeeCategory, { foreignKey: "category_id" });

EmployeeReviews.belongsTo(Employee, { foreignKey: "employee_id" });

await sequelize.sync({ alter: true });
