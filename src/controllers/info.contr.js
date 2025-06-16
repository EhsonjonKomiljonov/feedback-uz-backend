import { Info } from "../models/info.model.js";
import { Region } from "../models/region.model.js";
import { Republic } from "../models/republic.model.js";
import { deleteFile } from "../utils/deleteFile.js";

export class InfoController {
  async GET_ALL(req, res) {
    try {
      const infos = await Info.findAll({
        include: [Republic, Region]
      });

      res.status(200).send(infos);
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
  async CREATE(req, res) {
    try {
      const generatedImages = req?.files?.map((file) => `/public/uploads/${file.filename}`);

      await Info.create({ files: generatedImages, ...req.body });

      res.status(200).send("Successfully created!");
    } catch (err) {
      if (req.files?.length) {
        for (const file of req.files) {
          deleteFile(`/${file.path}`);
        }
      }

      res.status(err?.status || 400).send(err.message);
    }
  }
  async UPDATE(req, res) {
    try {
      const { id } = req.params;

      const info = await Info.findOne({
        where: {
          id: id,
        },
      });

      if (!info) {
        return res.status(400).send("This info doesn't exist!");
      }

      const updatedData = { ...req.body };
      if (req?.files?.length) {
        updatedData.files = req.files.map((f) => `/public/uploads/${f.filename}`);
      }

       if (info?.files?.length) {
        for (const file of info.files) {
          deleteFile(`/${file}`);
        }
      }

      info.set(updatedData);
      await info.validate();
      await info.save();

      res.status(200).send("Successfully updated!");
    } catch (err) {
      if (req.files?.length) {
        for (const file of req.files) {
          deleteFile(`/${file.path}`);
        }
      }

      res.status(err?.status || 400).send(err.message);
    }
  }
  async DELETE(req, res) {
    try {
      const { id } = req.params;

      const getDeletedInfo = await Info.findOne({
        where: {
          id: id,
        },
      });

      if (getDeletedInfo?.files?.length) {
        for (const file of getDeletedInfo.files) {
          deleteFile(`/${file}`);
        }
      }

      const deleteInfo = await Info.destroy({
        where: {
          id: id,
        },
      });

      if (!deleteInfo) {
        return res.status(400).send("This info doesn't exist!");
      }

      res.status(200).send("Successfully deleted!");
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  }
}
