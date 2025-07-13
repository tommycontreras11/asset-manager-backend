import { Request, Response } from "express";
import { deleteAssetTypeService } from "../../services/asset-type/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteAssetTypeController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteAssetTypeService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
