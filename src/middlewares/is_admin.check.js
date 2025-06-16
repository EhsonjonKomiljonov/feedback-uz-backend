import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";

export const checkIsAdmin = async (req, res, next, role = ["superadmin"]) => {
  try {
    if (role === "admin") role = ["admin", "superadmin"];

    const { authorization } = req.headers;

    const verifyToken = jwt.verify(
      authorization,
      process.env.ACCESS_SECRET_KEY
    );

    if (verifyToken) {
      const getAdmin = await Promise.all(
        role.map(async (item) => {
          return await Admin.findOne({
            where: {
              id: verifyToken?.id,
              login: verifyToken?.login,
              role: item,
            },
          });
        })
      );

      if (!getAdmin) {
        throw new Error(verifyToken);
      }
    }

    next();
  } catch (err) {
    res.status(401).send("You are not an admin!");
  }
};
