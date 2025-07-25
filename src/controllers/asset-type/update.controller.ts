import { Request, Response } from "express";
import { updateAssetTypeService } from "../../services/asset-type/update.service";
import { statusCode } from "../../utils/status.util";

export const updateAssetTypeController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  updateAssetTypeService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
