import { JournalEntryEntity } from "../../database/entities/entity/journal-entry.entity";
import {
  LedgerAccountEntity,
  LedgerAccountTypeEnum,
} from "../../database/entities/entity/ledger-account.entity";
import { CreateJournalEntryDTO } from "../../dto/journal-entry.dto";
import { statusCode } from "../../utils/status.util";
import { InventoryTypeEntity } from "./../../database/entities/entity/inventory-type.entity";

export async function createJournalEntryService({
  entry_date,
  amount,
  inventoryTypeUUID,
  ledgerAccountUUID,
  movementType
}: CreateJournalEntryDTO) {
  const foundInventoryType = await InventoryTypeEntity.findOneBy({
    uuid: inventoryTypeUUID,
  }).catch((e) => {
    console.error(
      "createJournalEntryService -> InventoryTypeEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundInventoryType) {
    return Promise.reject({
      message: "Inventory type not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundLedgerAccount = await LedgerAccountEntity.findOneBy({
    uuid: ledgerAccountUUID,
  }).catch((e) => {
    console.error(
      "createJournalEntryService -> LedgerAccountEntity.findOneBy: ",
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

  let description = `Asiento de Activos Fijos correspondiente al periodo ${new Date().getFullYear()} - ${new Date().getMonth() + 1}`;

  await JournalEntryEntity.create({
    description,
    entry_date,
    inventoryType: foundInventoryType,
    ledgerAccount: foundLedgerAccount,
    amount: parseFloat(amount),
    movement_type: movementType
  })
    .save()
    .catch((e) => {
      console.error(
        "createJournalEntryService -> JournalEntryEntity.create: ",
        e
      );
      return null;
    });

  return "Journal entry created successfully";
}
