import { Request, Response } from "express";
import { getAllLedgerAccountService } from "../../services/ledger-account/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllLedgerAccountController = async (_req: Request, res: Response) => {
  getAllLedgerAccountService({})
    .then((data) => {
      const inventoryTypes = data.map((inventoryType) => ({
        uuid: inventoryType.uuid,
        name: inventoryType.name,
        type: inventoryType.type,
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
