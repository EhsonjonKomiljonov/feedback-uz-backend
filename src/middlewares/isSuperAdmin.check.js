import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";

export const checkIsSuperAdmin = (token) => {
  try {
    const verifyToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

    if (verifyToken) {
      const getSuperAdmin = Admin.findOne({
        where: { id: verifyToken?.id, login: verifyToken?.login, role: 'superadmin' },
      });

      if (!getSuperAdmin) {
        return verifyToken;
      }
    }

    return true;
  } catch (err) {
    return false;
  }
};
