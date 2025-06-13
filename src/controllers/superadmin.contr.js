import { SuperAdmin } from "../models/superadmin.model.js";
import jwt from 'jsonwebtoken'

export default {
  LOGIN: async (req, res) => {
    const { login, password } = req.body;

    const getLogin = await SuperAdmin.findOne({
      where: {
        login: login,
        password: password,
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
  },
};
