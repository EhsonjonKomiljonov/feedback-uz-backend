import { Router } from "express";
import { PanelCategoryContr } from "../controllers/panel_category.contr.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";

export const PanelCategoryRouter = Router();

const { GET_ALL, CREATE, DELETE } = new PanelCategoryContr();

PanelCategoryRouter.get("/all", checkIsAdmin(), GET_ALL)
  .post("/create", checkIsAdmin(), CREATE)
  .delete("/delete/:id", checkIsAdmin(), DELETE);
