import { Request, Response } from "express";
import { updateLedgerAccountService } from "../../services/ledger-account/update.service";
import { statusCode } from "../../utils/status.util";

export const updateLedgerAccountController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  updateLedgerAccountService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
