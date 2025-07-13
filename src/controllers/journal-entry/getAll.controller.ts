import { Request, Response } from "express";
import { getAllJournalEntryService } from "../../services/journal-entry/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllJournalEntryController = async (_req: Request, res: Response) => {
  getAllJournalEntryService({
    relations: {
      inventoryType: true,
      ledgerAccount: true,
    }
  })
    .then((data) => {
      const journalEntries = data.map((journalEntry) => ({
        uuid: journalEntry.uuid,
        description: journalEntry.description,
        inventoryType: {
          uuid: journalEntry.inventoryType.uuid,
          name: journalEntry.inventoryType.name,
        },
        ledgerAccount: {
          uuid: journalEntry.ledgerAccount.uuid,
          name: journalEntry.ledgerAccount.name,
        },
        movement_type: journalEntry.movement_type,
        entry_date: journalEntry.entry_date,
        amount: journalEntry.amount,
        status: journalEntry.status,
      }));

      res.status(statusCode.OK).json({ data: journalEntries });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
