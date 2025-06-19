import { Router } from "express";
import { QualityCategoryContr } from "../controllers/quality_category.contr.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";

export const QualityCategoryRouter = Router();

const { GET_ALL, CREATE, UPDATE, DELETE } = new QualityCategoryContr();

QualityCategoryRouter.get("/all", checkIsAdmin(["sub_admin", "admin"]), GET_ALL)
  .post("/create", checkIsAdmin(["sub_admin"]), CREATE)
  .patch("/update/:id", checkIsAdmin(["sub_admin"]), UPDATE)
  .delete("/delete/:id", checkIsAdmin(["sub_admin"]), DELETE);
