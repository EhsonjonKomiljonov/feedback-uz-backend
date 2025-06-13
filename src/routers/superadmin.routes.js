import { Router } from "express";
import SuperAdminController from "../controllers/superadmin.contr.js";

const { LOGIN } = SuperAdminController;

export const SuperAdminRouter = Router();

SuperAdminRouter.post("/login", LOGIN);
