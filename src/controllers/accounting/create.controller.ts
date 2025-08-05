import { Request, Response } from "express";
import { createAccountingService } from "../../services/accounting/create.service";
import { statusCode } from "../../utils/status.util";

export const createAccountingController = async (req: Request, res: Response) => {
  createAccountingService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
