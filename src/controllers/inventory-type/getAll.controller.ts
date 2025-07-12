import { Request, Response } from "express";
import { getAllInventoryTypeService } from "../../services/inventory-type/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllInventoryTypeController = async (_req: Request, res: Response) => {
  getAllInventoryTypeService({})
    .then((data) => {
      const inventoryTypes = data.map((inventoryType) => ({
        uuid: inventoryType.uuid,
        name: inventoryType.name,
        description: inventoryType.description,
        status: inventoryType.status,
      }));

      res.status(statusCode.OK).json({ data: inventoryTypes });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
