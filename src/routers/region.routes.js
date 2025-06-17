import { Router } from "express";
import { RegionController } from "../controllers/region.contr.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";

export const RegionRouter = Router();

const { CREATE, GET_ALL, DELETE } = new RegionController();

RegionRouter.post("/create", checkIsAdmin(), CREATE)
  .get("/all", checkIsAdmin(), GET_ALL)
  .delete("/delete/:id", checkIsAdmin(), DELETE);
