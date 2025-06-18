import { Router } from "express";
import { AdminController } from "../controllers/admin.contr.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";

const {
  GET_ALL,
  LOGIN,
  CREATE,
  DELETE,
  BLOCK_EVENT_ADMIN,
  UPDATE_TOKEN,
  CREATE_SUPER_ADMIN,
} = new AdminController();

export const AdminRouter = Router();

AdminRouter.get("/all", checkIsAdmin(), GET_ALL)
  .post("/login", LOGIN)
  .post("/create", checkIsAdmin(), CREATE)
  .patch("/block/:id", checkIsAdmin(), BLOCK_EVENT_ADMIN)
  .delete("/delete/:id", checkIsAdmin(), DELETE)
  .get("/update-token", UPDATE_TOKEN);
// .post('/create-super-admin', CREATE_SUPER_ADMIN);
