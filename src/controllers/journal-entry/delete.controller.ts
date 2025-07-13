import { Request, Response } from "express";
import { deleteJournalEntryService } from "../../services/journal-entry/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteJournalEntryController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteJournalEntryService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
