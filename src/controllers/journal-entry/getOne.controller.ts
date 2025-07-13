import { Request, Response } from "express";
import { getOneJournalEntryService } from "../../services/journal-entry/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneJournalEntryController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOneJournalEntryService({
    where: {
      uuid,
    },
    relations: {
      inventoryType: true,
      ledgerAccount: true,
    },
  })
    .then((data) => {
      const inventoryType = {
        uuid: data.uuid,
        description: data.description,
        inventoryType: {
          uuid: data.inventoryType.uuid,
          name: data.inventoryType.name,
        },
        ledgerAccount: {
          uuid: data.ledgerAccount.uuid,
          name: data.ledgerAccount.name,
        },
        movement_type: data.movement_type,
        entry_date: data.entry_date,
        amount: data.amount,
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
