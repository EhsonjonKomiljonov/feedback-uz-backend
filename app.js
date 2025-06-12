import express from "express";
import { SuperAdminRouter } from "./routers/superadmin.routes";

export const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(process.cwd() + "/public"));

app.use('/super-admin', SuperAdminRouter)