import { Router } from "express";

export const SuperAdminRouter = Router();

SuperAdminRouter.post("/login", (req, res) => {
  const { super_admin_login, super_admin_password } = req.body;


  res.send({
    
  });
});
