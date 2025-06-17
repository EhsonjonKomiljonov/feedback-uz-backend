import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import sha256 from "sha256";
import { Info } from "../models/info.model.js";

export class AdminController {
  async GET_ALL(req, res) {
    try {
      const admins = await Admin.findAll({
        where: {
          role: ["admin", "sub_admin"],
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

      if (getLogin?.is_active === false) {
        return res
          .status(400)
          .send("Your login is blocked! Contact with super admin!");
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
      const { login, password, role, information_id } = req.body;

      if (role == "sub_admin" && !req.body?.department_id) {
        throw new Error("department_id is required if you need add sub_admin!");
      }

      if (role == "super_admin") {
        return res.status(400).send("You can't add super_admin!");
      }

      const getInformation = await Info.findOne({
        where: {
          id: information_id,
        },
      });

      if (!getInformation) {
        return res
          .status(400)
          .send(`This info with id: ${information_id} doesn't exist!`);
      }

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
        role: role,
        information_id,
        department_id: req.body?.department_id,
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
  async BLOCK_EVENT_ADMIN (req, res) {
    try {
      const { id } = req.params;

      const admin = await Admin.findOne({
        where: {
          id: id,
        },
      });

      if (!admin) {
        return res.status(400).send("This admin doesn't exist!");
      }

      admin.is_active = !admin.is_active;
      await admin.save();

      res.status(200).send("Successfully blocked!");
    } catch (err) {
      return res.status(err?.status || 400).send(err.message);
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
        role: "super_admin",
        information_id: 13,
      });

      res.status(200).send("Successfully created!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
}
