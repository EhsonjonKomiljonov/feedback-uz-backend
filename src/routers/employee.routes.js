import { Router } from "express";
import { EmployeeContr } from "../controllers/employee.contr.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";
import { upload } from "../utils/multer.js";

export const EmployeeRouter = Router();

const { CREATE, GET_ALL, DELETE } = new EmployeeContr();

EmployeeRouter.get("/all", GET_ALL)
  .post("/create", checkIsAdmin(["sub_admin"]), upload.single("file"), CREATE)
  .delete("/delete/:id", checkIsAdmin(["sub_admin"]), DELETE);
