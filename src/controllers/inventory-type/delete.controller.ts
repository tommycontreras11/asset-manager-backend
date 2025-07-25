import { Request, Response } from "express";
import { deleteInventoryTypeService } from "../../services/inventory-type/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteInventoryTypeController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteInventoryTypeService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
