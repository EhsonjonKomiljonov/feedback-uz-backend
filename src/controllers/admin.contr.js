import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { checkIsSuperAdmin } from "../middlewares/isSuperAdmin.check.js";
import sha256 from "sha256";

export default {
  GET_ALL: async (req, res) => {
    try {
      const { authorization } = req.headers;

      const checkSuperAdmin = checkIsSuperAdmin(authorization);

      if (!checkSuperAdmin) {
        return res.status(401).send("You don't have permission to get admins!");
      }

      const admins = await Admin.findAll({
        where: {
          role: "admin",
        },
      });

      res.status(200).send(admins);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  },
  LOGIN: async (req, res) => {
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
  },
  CREATE: async (req, res) => {
    try {
      const { authorization } = req.headers;

      const checkSuperAdmin = checkIsSuperAdmin(authorization);

      if (!checkSuperAdmin) {
        return res
          .status(401)
          .send("You don't have permission to create admin!");
      }

      const { login, password } = req.body;

      const getLogin = await Admin.findOne({
        where: {
          login: login,
        },
      });

      if (getLogin) {
        return res.status(400).send("This admin already exists!");
      }

      await Admin.create({ login: login, password: sha256(password), role: 'admin' });

      res.status(200).send("Successfully created!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  },
  DELETE: async (req, res) => {
    try {
      const { authorization } = req.headers;

      const checkSuperAdmin = checkIsSuperAdmin(authorization);

      if (!checkSuperAdmin) {
        return res
          .status(401)
          .send("You don't have permission to delete admin!");
      }

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
  },
  CREATE_SUPER_ADMIN: async (req, res) => {
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
  },
};
