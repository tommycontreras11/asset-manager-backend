import { Request, Response } from "express";
import { createJournalEntryService } from "../../services/journal-entry/create.service";
import { statusCode } from "../../utils/status.util";

export const createJournalEntryController = async (req: Request, res: Response) => {
  createJournalEntryService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
