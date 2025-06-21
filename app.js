import cors from "cors";
import express from "express";
import "./src/utils/sequelize.js";
import "./src/models/models.js";
import { AdminRouter } from "./src/routers/admin.routes.js";
import { RegionRouter } from "./src/routers/region.routes.js";
import { RepublicRouter } from "./src/routers/republic.routes.js";
import { InfoRouter } from "./src/routers/info.routes.js";
import { EmployeeCategoryRouter } from "./src/routers/employee_category.routes.js";
import { EmployeeRouter } from "./src/routers/employee.routes.js";
import { DepartmentRouter } from "./src/routers/department.routes.js";
import { EmployeeReviewsRouter } from "./src/routers/employee_reviews.routes.js";
import { PanelCategoryRouter } from "./src/routers/panel_category.routes.js";
import { IconRouter } from "./src/routers/icon.routes.js";
import { QualityCategoryRouter } from "./src/routers/quality_category.routes.js";
import { QualityRatingRouter } from "./src/routers/quality_rating.routes.js";
import { ClientFeedbackRouter } from "./src/routers/client_feedback.routes.js";

export const app = express();

const whitelist = ["http://localhost:3000", "http://localhost:5173"];

const corsOptions = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public/uploads", express.static(process.cwd() + "/public/uploads"));

app.use("/admin", AdminRouter);
app.use("/regions", RegionRouter);
app.use("/republic", RepublicRouter);
app.use("/info", InfoRouter);
app.use("/department", DepartmentRouter);
app.use("/employee_category", EmployeeCategoryRouter);
app.use("/employee", EmployeeRouter);
app.use("/employee_reviews", EmployeeReviewsRouter);
app.use("/panel_category", PanelCategoryRouter);
app.use("/icons", IconRouter);
app.use("/quality_category", QualityCategoryRouter);
app.use("/quality_rating", QualityRatingRouter);
app.use("/client_feedback", ClientFeedbackRouter);
