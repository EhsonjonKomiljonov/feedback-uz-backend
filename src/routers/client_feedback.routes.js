import { Router } from "express";
import { ClientFeedbackContr } from "../controllers/client_feedback.contr.js";
import { checkIsAdmin } from "../middlewares/is_admin.check.js";
import { upload } from "../utils/multer.js";

export const ClientFeedbackRouter = Router();

const { GET_ALL, CREATE, GET_BY_TYPE } = new ClientFeedbackContr();

ClientFeedbackRouter.get("/all", checkIsAdmin(["sub_admin", "admin"]), GET_ALL)
  .get("/type/:type", checkIsAdmin(["sub_admin", "admin"]), GET_BY_TYPE)
  .post("/add", upload.single("file"), CREATE);
