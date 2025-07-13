import { Request, Response } from "express";
import { createAssetTypeService } from "../../services/asset-type/create.service";
import { statusCode } from "../../utils/status.util";

export const createAssetTypeController = async (req: Request, res: Response) => {
  createAssetTypeService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
