import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";

export const checkIsAdmin = (req, res, next, role = 'superadmin') => {
  try {
    const { authorization } = req.headers;

    const verifyToken = jwt.verify(
      authorization,
      process.env.ACCESS_SECRET_KEY
    );

    if (verifyToken) {
      const getSuperAdmin = Admin.findOne({
        where: {
          id: verifyToken?.id,
          login: verifyToken?.login,
          role: role,
        },
      });

      if (!getSuperAdmin) {
        throw new Error(verifyToken);
      }
    }

    next();
  } catch (err) {
    res.status(401).send("You are not an super admin!");
  }
};
