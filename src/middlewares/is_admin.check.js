import { ACCESS_SECRET } from "../../env.js";
import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";

export const checkIsAdmin = (role) => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;

      const verifyToken = jwt.verify(authorization, ACCESS_SECRET);

      if (verifyToken) {
        const getAdmin = await Promise.all(
          (!role ? ["super_admin"] : ["super_admin", ...role]).map(
            async (item) => {
              return await Admin.findOne({
                where: {
                  id: verifyToken?.id,
                  login: verifyToken?.login,
                  role: item,
                },
              });
            }
          )
        );

        const filteredAdmins = getAdmin.filter((item) => item != null);

        if (filteredAdmins.length === 0) {
          throw new Error(`You have no access for this action!`);
        }

        if (!filteredAdmins[0]?.is_active) {
          throw new Error(`Your login is blocked! Contact with super admin!`);
        }
      }

      next();
    } catch (err) {
      res.status(401).send(err.message);
    }
  };
};
