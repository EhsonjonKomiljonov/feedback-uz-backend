import { Router } from "express";
import { InfoController } from "../controllers/info.contr.js";
import { upload } from "../utils/multer.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";

export const InfoRouter = Router();

const { CREATE, GET_ALL, GET_ONE, GET_BY_FILTER, UPDATE, DELETE } = new InfoController();

InfoRouter.get("/all", GET_ALL).get('/one/:id', GET_ONE).get('/filter', GET_BY_FILTER)
  .patch("/update/:id", checkIsAdmin(), upload.array("files"), UPDATE)
  .post("/create", checkIsAdmin(), upload.array("files"), CREATE)
  .delete("/delete/:id", DELETE);
