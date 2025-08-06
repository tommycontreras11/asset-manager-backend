import { config } from "./../../config";
import {
  LedgerAccountEntity,
  LedgerAccountTypeEnum,
} from "../../database/entities/entity/ledger-account.entity";
import { statusCode } from "../../utils/status.util";
import {
  JournalEntryEntity,
  MovementTypeEnum,
} from "./../../database/entities/entity/journal-entry.entity";
import { CreateAccountingListDTO } from "./../../dto/journal-entry.dto";
import { getFullDate } from "./../../utils/date.util";

interface IAccountingPayload {
  descripcion: string;
  cuenta_Id: string;
  auxiliar_Id: string;
  tipoMovimiento: string; // "CR" for credit, "DB" for debit
  fechaAsiento: string;
  montoAsiento: string;
}

export async function createAccountingService(
  accounting: CreateAccountingListDTO
) {
  const accountingPayload: IAccountingPayload[] = [];

  await recursiveGetDataToSendToAccounting({
    ...accounting,
    accountingPayload,
  });

  return "Accounting data processed successfully";
}

const recursiveGetDataToSendToAccounting = async ({
  accounting,
  accountingPayload,
}: CreateAccountingListDTO & {
  accountingPayload: IAccountingPayload[];
}): Promise<unknown> => {
  const payload = accounting.pop();

  if (!payload) return accountingPayload;

  const foundLedgerAccount = await LedgerAccountEntity.findOneBy({
    uuid: payload.ledgerAccountUUID,
  }).catch((e) => {
    console.error(
      "createAccountingService -> LedgerAccountEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundLedgerAccount) {
    return Promise.reject({
      message: "Ledger account not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (foundLedgerAccount.type !== LedgerAccountTypeEnum.GENERAL)
    return Promise.reject({
      message: "Ledger account type must be general",
      status: statusCode.BAD_REQUEST,
    });

  const movementType =
    payload.movementType === MovementTypeEnum.CREDIT ? "CR" : "DB";

  const foundJournalEntry = await JournalEntryEntity.findOneBy({
    uuid: payload.uuid,
  }).catch((e) => {
    console.error(
      "createAccountingService -> JournalEntryEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundJournalEntry) {
    return Promise.reject({
      message: "Journal entry not found",
      status: statusCode.NOT_FOUND,
    });
  }

  console.log("accountableSystemUrl: ", config.accountableSystemUrl)

  await fetch(`${config.accountableSystemUrl}/public/entradas-contables`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.accountableSystemApiKey,
    },
    body: JSON.stringify({
      descripcion: payload.description,
      cuenta_Id: `${foundLedgerAccount.id}`,
      auxiliar_Id: "8",
      tipoMovimiento: movementType,
      fechaAsiento: getFullDate(new Date(payload.entry_date)),
      montoAsiento: payload.amount,
    }),
  })
    .then(async (res) => {
      const data = await res.json();

      foundJournalEntry.journal_id = data?.data.id;
      await foundJournalEntry.save().catch((e) => {
        console.error(
          "createAccountingService -> JournalEntryEntity.create: ",
          e
        );
        return null;
      });
    })
    .catch((e) => {
      console.error("createAccountingService -> fetch: ", e);
    });

  return recursiveGetDataToSendToAccounting({ accounting, accountingPayload });
};
