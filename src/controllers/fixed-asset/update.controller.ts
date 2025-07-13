import { Request, Response } from "express";
import { updateFixedAssetService } from "../../services/fixed-asset/update.service";
import { statusCode } from "../../utils/status.util";

export const updateFixedAssetController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  updateFixedAssetService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
