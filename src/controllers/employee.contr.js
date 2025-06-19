import { Department } from "../models/department.model.js";
import { Employee } from "../models/employee.model.js";
import { EmployeeCategory } from "../models/employee_category.model.js";
import jwt from "jsonwebtoken";

export class EmployeeContr {
  async GET_ALL(req, res) {
    try {
      const { authorization } = req.headers;

      const verifyToken = jwt.verify(authorization, ACCESS_SECRET);

      if (!verifyToken) return res.status(401).send("Unauthorized!");

      const employees = await Employee.findAll({
        include: [EmployeeCategory, Department],
        where: { department_id: verifyToken.department_id },
      });

      res.status(200).send(employees);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async CREATE(req, res) {
    try {
      const { category_id } = req.body;
      const { authorization } = req.headers;

      const verifyToken = jwt.verify(authorization, ACCESS_SECRET);

      if (!verifyToken) return res.status(401).send("Unauthorized!");

      const getCategory = await EmployeeCategory.findOne({
        where: {
          id: category_id,
        },
      });

      if (!getCategory) {
        return res.status(400).send("This employee category doesn't exist!");
      }

      const getDepartment = await Department.findOne({
        where: {
          id: verifyToken.department_id,
        },
      });

      if (!getDepartment) {
        return res.status(400).send("This department doesn't exist!");
      }

      await Employee.create({
        department_id: verifyToken.department_id,
        file: `/public/uploads/${req.file?.filename}`,
        ...req.body,
      });

      res.status(200).send("Successfully created!");
    } catch (err) {
      if (req.files?.length) {
        for (const file of req.files) {
          deleteFile(`/${file.path}`);
        }
      }

      res.status(err?.status || 400).send(err.message);
    }
  }
  async DELETE(req, res) {
    try {
      const { id } = req.params;

      const deleteEmployee = await Employee.destroy({
        where: {
          id: id,
        },
      });

      if (!deleteEmployee) {
        return res.status(400).send("This employee doesn't exist!");
      }

      res.status(200).send("Successfully deleted!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
}
