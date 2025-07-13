import { Request, Response } from "express";
import { updateJournalEntryService } from "../../services/journal-entry/update.service";
import { statusCode } from "../../utils/status.util";

export const updateJournalEntryController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  updateJournalEntryService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
