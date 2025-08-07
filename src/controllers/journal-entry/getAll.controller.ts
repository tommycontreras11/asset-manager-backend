import { Request, Response } from "express";
import { getAllJournalEntryService } from "../../services/journal-entry/getAll.service";
import { statusCode } from "../../utils/status.util";
import { Between, IsNull, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

export const getAllJournalEntryController = async (
  req: Request,
  res: Response
) => {
  const { from, to } = req.query as { from?: string; to?: string };

  let whereClause = {};

  if (from && to) {
    whereClause = {
      entry_date: Between(normalizeDateStart(from), normalizeDateEnd(to)),
      journal_id: IsNull(),
    };
  } else if (from) {
    whereClause = {
      entry_date: MoreThanOrEqual(normalizeDateStart(from)),
      journal_id: IsNull(),
    };
  } else if (to) {
    whereClause = {
      entry_date: LessThanOrEqual(normalizeDateEnd(to)),
      journal_id: IsNull(),
    };
  }

  getAllJournalEntryService({
    relations: {
      inventoryType: true,
      ledgerAccount: true,
    },
    ...(Object.keys(whereClause).length ? { where: whereClause } : {}),
  })
    .then((data) => {
      const journalEntries = data.map((journalEntry) => ({
        uuid: journalEntry.uuid,
        description: journalEntry.description,
        journal_id: journalEntry.journal_id,
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

const normalizeDateStart = (dateStr: string) => {
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  return date;
};

const normalizeDateEnd = (dateStr: string) => {
  const date = new Date(dateStr);
  date.setHours(23, 59, 59, 999);
  return date;
};
