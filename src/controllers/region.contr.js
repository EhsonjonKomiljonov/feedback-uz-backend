import { Region } from "../models/region.model.js";

export class RegionController {
  async CREATE(req, res) {
    try {
      const { name_uz, name_ru } = req.body;

      await Region.create({
        name_uz: name_uz,
        name_ru: name_ru,
      });

      res.status(200).send("Successfully created!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async GET_ALL (req, res) {
    try {
      const regions = await Region.findAll();

      res.status(200).send(regions);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async DELETE (req, res) {
    try {
      const { id } = req.params;

      const deleteRegion = await Region.destroy({
        where: {
          id: id,
        },
      });

      if (!deleteRegion) {
        return res.status(400).send("This region doesn't exist!");
      }

      res.status(200).send("Successfully deleted!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
}
