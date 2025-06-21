import { Router } from "express";
import { DepartmentContr } from "../controllers/department.contr.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";

export const DepartmentRouter = Router();

const { CREATE, GET_ALL, GET_BY_FILTER, UPDATE, DELETE } = new DepartmentContr();

DepartmentRouter.get("/all", GET_ALL).get('/filter', GET_BY_FILTER)
  .post("/create", checkIsAdmin(), CREATE)
  .patch("/update/:id", checkIsAdmin(), UPDATE)
  .delete("/delete/:id", checkIsAdmin(), DELETE);
