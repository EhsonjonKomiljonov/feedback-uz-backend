import { Router } from "express";
import { EmployeeCategoryContr } from "../controllers/employee_category.contr.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";

export const EmployeeCategoryRouter = Router();

const { GET_ALL, CREATE, DELETE } = new EmployeeCategoryContr();

EmployeeCategoryRouter.get(
  "/all",
  (req, res, next) => checkIsAdmin(req, res, next, "admin"),
  GET_ALL
)
  .post(
    "/create",
    (req, res, next) => checkIsAdmin(req, res, next, "admin"),
    CREATE
  )
  .delete(
    "/delete/:id",
    (req, res, next) => checkIsAdmin(req, res, next, "admin"),
    DELETE
  );
