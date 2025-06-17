import { Department } from "../models/department.model.js";
import { EmployeeCategory } from "../models/employee_category.model.js"; 

export class EmployeeCategoryContr {
  async GET_ALL(req, res) {
    try {
      const employeeCategories = await EmployeeCategory.findAll({
        include: Department
      });

      res.status(200).send(employeeCategories);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async CREATE(req, res) {
    try {
      const getDepartment = await Department.findOne({
        where: {
          id: req.body.department_id
        }
      })

      if(!getDepartment) {
        return res.status(404).send("This department doesn't exist!");
      }

      await EmployeeCategory.create(req.body);

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
