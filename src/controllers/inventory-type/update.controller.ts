import { Request, Response } from "express";
import { updateInventoryTypeService } from "../../services/inventory-type/update.service";
import { statusCode } from "../../utils/status.util";

export const updateInventoryTypeController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  updateInventoryTypeService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
