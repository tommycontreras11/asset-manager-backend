import { Request, Response } from "express";
import { createInventoryTypeService } from "../../services/inventory-type/create.service";
import { statusCode } from "../../utils/status.util";

export const createInventoryTypeController = async (req: Request, res: Response) => {
  createInventoryTypeService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
