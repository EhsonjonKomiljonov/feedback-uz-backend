import { Router } from "express";
import {AdminController} from "../controllers/admin.contr.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";

const { GET_ALL, LOGIN, CREATE, DELETE, CREATE_SUPER_ADMIN } = new AdminController();

export const AdminRouter = Router();

AdminRouter.get("/all", checkIsAdmin, GET_ALL)
  .post("/login", LOGIN)
  .post("/create", checkIsAdmin, CREATE)
  .delete("/delete/:id", checkIsAdmin, DELETE);
// .post('/create-super-admin', CREATE_SUPER_ADMIN);
