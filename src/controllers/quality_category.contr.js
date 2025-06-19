import { ACCESS_SECRET } from "../../env.js";
import { Icon } from "../models/icon.model.js";
import { Info } from "../models/info.model.js";
import { QualityCategory } from "../models/quality_categories.model.js";
import jwt from "jsonwebtoken";

export class QualityCategoryContr {
  async GET_ALL(req, res) {
    try {
      const { authorization } = req.headers;

      const verifyToken = jwt.verify(authorization, ACCESS_SECRET);

      if (!verifyToken) return res.status(401).send("Unauthorized!");

      const qualityCategories = await QualityCategory.findAll({
        include: [Icon, Info],
        where: {
          information_id: verifyToken.information_id,
        },
      });

      res.status(200).send(qualityCategories);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async CREATE(req, res) {
    try {
      const { authorization } = req.headers;
      const { icon_id } = req.body;

      const getIcon = await Icon.findOne({
        where: {
          id: icon_id,
        },
      });

      if (!getIcon) {
        return res.status(400).send("This icon doesn't exist!");
      }

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

      await QualityCategory.create({
        information_id: verifyToken.information_id,
        ...req.body,
      });

      res.status(200).send("Successfully created!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async DELETE(req, res) {
    try {
      const { id } = req.params;

      const deleteQualityCategory = await QualityCategory.destroy({
        where: {
          id: id,
        },
      });

      if (!deleteQualityCategory) {
        return res.status(400).send("This quality category doesn't exist!");
      }

      res.status(200).send("Successfully deleted!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async UPDATE(req, res) {
    try {
      const { id } = req.params;

      const qualityCategory = await QualityCategory.findOne({
        where: {
          id: id,
        },
      });

      if (!qualityCategory) {
        return res.status(400).send("This quality category doesn't exist!");
      }

      qualityCategory.set(req.body);
      await qualityCategory.validate();
      await qualityCategory.save();

      res.status(200).send("Successfully updated!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
}
