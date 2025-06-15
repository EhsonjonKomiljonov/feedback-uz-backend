import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import sha256 from "sha256";

export class AdminController {
  async GET_ALL(req, res) {
    try {
      const admins = await Admin.findAll({
        where: {
          role: "admin",
        },
      });

      res.status(200).send(admins);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async LOGIN(req, res) {
    try {
      const { login, password } = req.body;

      const getLogin = await Admin.findOne({
        where: {
          login: login,
          password: sha256(password),
        },
      });

      if (!getLogin) {
        return res.status(404).send("Incorrect login or password");
      }

      const token = jwt.sign(
        { id: getLogin.id, login: getLogin.login },
        process.env.ACCESS_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      const refreshToken = jwt.sign(
        { id: getLogin.id, login: getLogin.login },
        process.env.REFRESH_SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).send({
        token: token,
        refreshToken: refreshToken,
      });
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async CREATE(req, res) {
    try {
      const { login, password } = req.body;

      const getLogin = await Admin.findOne({
        where: {
          login: login,
        },
      });

      if (getLogin) {
        return res.status(400).send("This admin already exists!");
      }

      await Admin.create({
        login: login,
        password: sha256(password),
        role: "admin",
      });

      res.status(200).send("Successfully created!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async DELETE(req, res) {
    try {
      const { id } = req.params;

      const deleteAdmin = await Admin.destroy({
        where: {
          id: id,
        },
      });

      if (!deleteAdmin) {
        return res.status(400).send("This admin doesn't exist!");
      }

      res.status(200).send("Successfully deleted!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async CREATE_SUPER_ADMIN(req, res) {
    try {
      const { login, password } = req.body;

      const getLogin = await Admin.findOne({
        where: {
          login: login,
        },
      });

      if (getLogin) {
        return res.status(400).send("This admin already exists!");
      }

      await Admin.create({
        login: login,
        password: sha256(password),
        role: "superadmin",
      });

      res.status(200).send("Successfully created!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
}
