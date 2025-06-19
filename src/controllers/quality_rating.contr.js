import { QualityCategory } from "../models/quality_categories.model.js";
import { QualityRating } from "../models/quality_rating.model.js";

export class QualityRatingContr {
  async GET_ALL(req, res) {
    try {
      const getRatings = await QualityRating.findAll({
        include: [QualityCategory],
      });

      res.status(200).send(getRatings);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async CREATE(req, res) {
    try {
      const { quality_category_id } = req.body;

      const getQualityCategory = await QualityCategory.findOne({
        where: {
          id: quality_category_id,
        },
      });

      if (!getQualityCategory) {
        return res.status(400).send("This quality category doesn't exist!");
      }

      await QualityRating.create(req.body);

      res.status(200).send("Successfully created!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
}
