import { PanelCategory } from "../models/panel_category.model.js";

export class PanelCategoryContr {
  async GET_ALL(req, res) {
    try {
      const getPanelCategories = await PanelCategory.findAll();

      res.status(200).send(getPanelCategories);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async CREATE(req, res) {
    try {
      await PanelCategory.create(req.body);

      res.status(200).send("Successfully created!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async DELETE(req, res) {
    try {
      const { id } = req.params;

      const deletePanelCategory = await PanelCategory.destroy({
        where: {
          id: id,
        },
      });

      if (!deletePanelCategory) {
        return res.status(400).send("This panel category doesn't exist!");
      }

      res.status(200).send("Successfully deleted!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
}
