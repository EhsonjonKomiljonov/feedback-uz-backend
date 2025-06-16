import { EmployeeCategory } from "../models/employee_category.model.js";
import { Info } from "../models/info.model.js";

export class EmployeeCategoryContr {
  async GET_ALL(req, res) {
    try {
      const employeeCategories = await EmployeeCategory.findAll({
        include: Info
      });

      res.status(200).send(employeeCategories);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async CREATE(req, res) {
    try {
      const getInfo = await Info.findOne({
        where: {
          id: req.body.information_id
        }
      })

      if(!getInfo) {
        return res.status(404).send("This info doesn't exist!");
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
