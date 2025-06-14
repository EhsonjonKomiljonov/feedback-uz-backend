import { Router } from "express";
import AdminController from "../controllers/admin.contr.js";

const { GET_ALL, LOGIN, CREATE, DELETE, CREATE_SUPER_ADMIN } = AdminController;

export const AdminRouter = Router();

AdminRouter.get("/all", GET_ALL)
  .post("/login", LOGIN)
  .post("/create", CREATE)
  .delete("/delete/:id", DELETE);
// .post('/create-super-admin', CREATE_SUPER_ADMIN);
