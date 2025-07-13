import { Request, Response } from "express";
import { createLedgerAccountService } from "../../services/ledger-account/create.service";
import { statusCode } from "../../utils/status.util";

export const createLedgerAccountController = async (req: Request, res: Response) => {
  createLedgerAccountService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
