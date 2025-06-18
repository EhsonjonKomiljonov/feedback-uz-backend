import { Icon } from "../models/icon.model.js";
import { PanelCategory } from "../models/panel_category.model.js";

export class IconContr {
  async GET_ALL(req, res) {
    try {
      const getIcons = await Icon.findAll({
        include: [PanelCategory]
      });

      res.status(200).send(getIcons);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async CREATE(req, res) {
    try {
      await Icon.create({
        file: `/public/uploads/${req.file?.filename}`,
        ...req.body,
      });

      res.status(200).send("Successfully created!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
}
