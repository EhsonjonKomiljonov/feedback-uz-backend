import { Router } from "express";
import { QualityRatingContr } from "../controllers/quality_rating.contr.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";

export const QualityRatingRouter = Router();

const { GET_ALL, CREATE } = new QualityRatingContr();

QualityRatingRouter.get(
  "/all",
  checkIsAdmin(["sub_admin", "admin"]),
  GET_ALL
).post("/add", CREATE);
