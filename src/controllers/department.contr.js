import { ACCESS_SECRET } from "../../env.js";
import { Department } from "../models/department.model.js";
import { Info } from "../models/info.model.js";
import jwt from "jsonwebtoken";

export class DepartmentContr {
  async GET_ALL(req, res) {
    try {
      const information_id = req.query?.information_id
      
      const departments = await Department.findAll({
        include: [Info],
        where: { information_id: information_id },
      });

      res.status(200).send(departments);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async CREATE(req, res) {
    try {
      const { authorization } = req.headers;

      const verifyToken = jwt.verify(authorization, ACCESS_SECRET);

      if (!verifyToken) return res.status(401).send("Unauthorized!");

      const getInformation = await Info.findOne({
        where: {
          id: verifyToken.information_id,
        },
      });

      if (!getInformation) {
        return res
          .status(400)
          .send(`This info with id: ${information_id} doesn't exist!`);
      }

      await Department.create({
        information_id: verifyToken.information_id,
        ...req.body,
      });

      res.status(200).send("Successfully created!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async UPDATE(req, res) {
    try {
      const { id } = req.params;

      const department = await Department.findOne({
        where: {
          id: id,
        },
      });

      if (!department) {
        return res.status(400).send("This department doesn't exist!");
      }

      department.set(req.body);
      await department.validate();
      await department.save();

      res.status(200).send("Successfully updated!");
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

      const deleteDepartment = await Department.destroy({
        where: {
          id: id,
        },
      });

      if (!deleteDepartment) {
        return res.status(400).send("This department doesn't exist!");
      }

      res.status(200).send("Successfully deleted!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
}
