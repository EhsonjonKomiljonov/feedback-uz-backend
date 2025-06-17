import { Router } from "express";
import { EmployeeReviewsContr } from "../controllers/employee_reviews.contr.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";

export const EmployeeReviewsRouter = Router();

const { CREATE, GET_ALL } = new EmployeeReviewsContr();

EmployeeReviewsRouter.get(
  "/all",
  checkIsAdmin(["sub_admin", "admin"]),
  GET_ALL
).post("/add", CREATE);
