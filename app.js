import express from "express";
import { SuperAdminRouter } from "./src/routers/superadmin.routes.js";
import "./src/utils/sequelize.js";
import './src/models/models.js'

export const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(process.cwd() + "/public"));

app.use("/super-admin", SuperAdminRouter);
