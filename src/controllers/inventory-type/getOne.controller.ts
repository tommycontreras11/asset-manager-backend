import { Request, Response } from "express";
import { getOneInventoryTypeService } from "../../services/inventory-type/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneInventoryTypeController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneInventoryTypeService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const inventoryType = {
        uuid: data.uuid,
        name: data.name,
        description: data.description,
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: inventoryType });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
