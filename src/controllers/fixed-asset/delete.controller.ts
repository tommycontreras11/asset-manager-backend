import { Request, Response } from "express";
import { deleteFixedAssetService } from "../../services/fixed-asset/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteFixedAssetController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteFixedAssetService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
