import { Request, Response } from "express";
import { createFixedAssetService } from "../../services/fixed-asset/create.service";
import { statusCode } from "../../utils/status.util";

export const createFixedAssetController = async (req: Request, res: Response) => {
  createFixedAssetService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
