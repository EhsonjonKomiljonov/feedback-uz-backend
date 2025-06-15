import { Republic } from "../models/republic.model.js";

export class RepublicController {
  async CREATE(req, res) {
    try {
      const { name_uz, name_ru } = req.body;

      await Republic.create({
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
      const Republics = await Republic.findAll();

      res.status(200).send(Republics);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async DELETE (req, res) {
    try {
      const { id } = req.params;

      const deleteRepublic = await Republic.destroy({
        where: {
          id: id,
        },
      });

      if (!deleteRepublic) {
        return res.status(400).send("This republic doesn't exist!");
      }

      res.status(200).send("Successfully deleted!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
}
