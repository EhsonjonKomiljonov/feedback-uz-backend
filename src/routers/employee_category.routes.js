import { Router } from "express";
import { EmployeeCategoryContr } from "../controllers/employee_category.contr.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";

export const EmployeeCategoryRouter = Router();

const { GET_ALL, CREATE, DELETE } = new EmployeeCategoryContr();

EmployeeCategoryRouter.get(
  "/all",
  checkIsAdmin(["sub_admin", "admin"]),
  GET_ALL
)
  .post("/create", checkIsAdmin(["sub_admin"]), CREATE)
  .delete("/delete/:id", checkIsAdmin(["sub_admin"]), DELETE);
