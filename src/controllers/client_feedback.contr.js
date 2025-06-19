import { ACCESS_SECRET } from "../../env.js";
import { ClientFeedback } from "../models/client_feedback.model.js";
import { Info } from "../models/info.model.js";
import jwt from "jsonwebtoken";

export class ClientFeedbackContr {
  async GET_ALL(req, res) {
    try {
      const { authorization } = req.headers;

      const verifyToken = jwt.verify(authorization, ACCESS_SECRET);

      if (!verifyToken) return res.status(401).send("Unauthorized!");

      const getFeedbacks = await ClientFeedback.findAll({
        include: [Info],
        where: {
          information_id: verifyToken.information_id,
        },
      });

      res.status(200).send(getFeedbacks);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async GET_BY_TYPE(req, res) {
    try {
      const { authorization } = req.headers;

      const verifyToken = jwt.verify(authorization, ACCESS_SECRET);

      if (!verifyToken) return res.status(401).send("Unauthorized!");

      const getFeedbacks = await ClientFeedback.findAll({
        include: [Info],
        where: {
          information_id: verifyToken.information_id,
          type: req.params.type,
        },
      });

      res.status(200).send(getFeedbacks);
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

      await ClientFeedback.create({
        information_id: verifyToken.information_id,
        file: `/public/uploads/${req.file?.filename}`,
        ...req.body,
      });

      res.status(200).send("Successfully created!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
}
