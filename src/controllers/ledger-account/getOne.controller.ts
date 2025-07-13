import { Request, Response } from "express";
import { getOneLedgerAccountService } from "../../services/ledger-account/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneLedgerAccountController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneLedgerAccountService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const inventoryType = {
        uuid: data.uuid,
        code: data.code,
        name: data.name,
        type: data.type,
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
