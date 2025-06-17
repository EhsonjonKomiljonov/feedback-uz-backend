import { Router } from "express";
import { RepublicController } from "../controllers/republic.contr.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";

export const RepublicRouter = Router();

const { CREATE, GET_ALL, DELETE } = new RepublicController();

RepublicRouter.post("/create", checkIsAdmin(), CREATE)
  .get("/all", checkIsAdmin(), GET_ALL)
  .delete("/delete/:id", checkIsAdmin(), DELETE);
