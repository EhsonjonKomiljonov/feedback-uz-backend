import { Employee } from "../models/employee.model.js";
import { EmployeeReviews } from "../models/employee_reviews.model.js";

export class EmployeeReviewsContr {
  async GET_ALL(req, res) {
    try {
      const employeeReviews = await EmployeeReviews.findAll({
        include: [Employee],
      });

      res.status(200).send(employeeReviews);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async CREATE(req, res) {
    try {
      const { employee_id } = req.body;

      const getEmployee = await Employee.findOne({
        where: {
          id: employee_id,
        },
      });

      if (!getEmployee) {
        return res.status(400).send("This employee doesn't exist!");
      }

      await EmployeeReviews.create(req.body);

      res.status(200).send("Successfully created!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
}
