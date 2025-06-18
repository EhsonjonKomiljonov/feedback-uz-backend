import { Router } from "express";
import { IconContr } from "../controllers/icon.contr.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";
import { upload } from "../utils/multer.js";

export const IconRouter = Router();

const { GET_ALL, CREATE } = new IconContr();

IconRouter.get("/all", checkIsAdmin(["sub_admin"]), GET_ALL).post(
  "/create",
  checkIsAdmin(),
  upload.single('file'),
  CREATE
);
