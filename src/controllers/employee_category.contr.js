import { Department } from "../models/department.model.js";
import { EmployeeCategory } from "../models/employee_category.model.js";
import jwt from "jsonwebtoken";

export class EmployeeCategoryContr {
  async GET_ALL(req, res) {
    try {
      const { authorization } = req.headers;

      const verifyToken = jwt.verify(authorization, ACCESS_SECRET);

      if (!verifyToken) return res.status(401).send("Unauthorized!");

      const employeeCategories = await EmployeeCategory.findAll({
        include: Department,
        where: {
          department_id: verifyToken?.department_id,
        },
      });

      res.status(200).send(employeeCategories);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async CREATE(req, res) {
    try {
      const { authorization } = req.headers;

      const verifyToken = jwt.verify(authorization, ACCESS_SECRET);

      if (!verifyToken) return res.status(401).send("Unauthorized!");

      const getDepartment = await Department.findOne({
        where: {
          id: verifyToken.department_id,
        },
      });

      if (!getDepartment) {
        return res.status(404).send("This department doesn't exist!");
      }

      await EmployeeCategory.create({
        department_id: verifyToken.department_id,
        ...req.body,
      });

      res.status(200).send("Successfully created!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async DELETE(req, res) {
    try {
      const { id } = req.params;

      const deleteEmployeeCategory = await EmployeeCategory.destroy({
        where: {
          id: id,
        },
      });

      if (!deleteEmployeeCategory) {
        return res.status(404).send("This employee category doesn't exist!");
      }

      res.status(200).send("Successfully deleted!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
}
