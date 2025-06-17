import { Department } from "../models/department.model.js";
import { Employee } from "../models/employee.model.js";
import { EmployeeCategory } from "../models/employee_category.model.js"; 

export class EmployeeContr {
  async GET_ALL(req, res) {
    try {
      const { department_id } = req.query;

      if (!department_id) {
        throw new Error("department_id is required, send it with query!");
      }

      const employees = await Employee.findAll({
        include: [EmployeeCategory, Department],
        where: { department_id },
      });

      res.status(200).send(employees);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async CREATE(req, res) {
    try {

      await Employee.create({
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
