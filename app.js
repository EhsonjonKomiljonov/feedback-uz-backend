import express from "express";
import "./src/utils/sequelize.js";
import './src/models/models.js'
import { AdminRouter } from "./src/routers/admin.routes.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(process.cwd() + "/public"));

app.use("/admin", AdminRouter);
