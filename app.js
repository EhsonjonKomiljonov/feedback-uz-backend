import express from "express";
import "./src/utils/sequelize.js";
import "./src/models/models.js";
import { AdminRouter } from "./src/routers/admin.routes.js";
import { RegionRouter } from "./src/routers/region.routes.js";
import { RepublicRouter } from "./src/routers/republic.routes.js";
import { InfoRouter } from "./src/routers/info.routes.js";
import cors from "cors";
import { EmployeeCategoryRouter } from "./src/routers/employee_category.routes.js";
import { EmployeeRouter } from "./src/routers/employee.routes.js";
import { DepartmentRouter } from "./src/routers/department.routes.js";
import { EmployeeReviewsRouter } from "./src/routers/employee_reviews.routes.js";

export const app = express();

// const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true); // Allow request
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   allowedHeaders: ["Content-Type", "Authorization"],
//   methods: "GET,POST,PUT,DELETE,PATCH",
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(process.cwd() + "/public/uploads"));

app.use("/admin", AdminRouter);
app.use("/regions", RegionRouter);
app.use("/republic", RepublicRouter);
app.use("/info", InfoRouter);
app.use("/department", DepartmentRouter);
app.use("/employee_category", EmployeeCategoryRouter);
app.use("/employee", EmployeeRouter);
app.use("/employee_reviews", EmployeeReviewsRouter);
