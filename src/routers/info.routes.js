import { Router } from "express";
import { InfoController } from "../controllers/info.contr.js";
import { upload } from "../utils/multer.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";

export const InfoRouter = Router();

const { CREATE, GET_ALL, UPDATE, DELETE } = new InfoController();

InfoRouter.get("/all", checkIsAdmin(), GET_ALL)
  .patch("/update/:id", checkIsAdmin(), upload.array("files"), UPDATE)
  .post("/create", checkIsAdmin(), upload.array("files"), CREATE)
  .delete("/delete/:id", DELETE);
