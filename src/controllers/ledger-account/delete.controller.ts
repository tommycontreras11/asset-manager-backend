import { Request, Response } from "express";
import { deleteLedgerAccountService } from "../../services/ledger-account/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteLedgerAccountController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteLedgerAccountService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
