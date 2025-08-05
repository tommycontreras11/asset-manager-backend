import { JournalEntryEntity } from "../../database/entities/entity/journal-entry.entity";
import {
  LedgerAccountEntity,
  LedgerAccountTypeEnum,
} from "../../database/entities/entity/ledger-account.entity";
import { UpdateJournalEntryDTO } from "../../dto/journal-entry.dto";
import { statusCode } from "../../utils/status.util";
import { InventoryTypeEntity } from "./../../database/entities/entity/inventory-type.entity";

export async function updateJournalEntryService(
  uuid: string,
  {
    entry_date,
    amount,
    inventoryTypeUUID,
    ledgerAccountUUID,
    movementType,
    status,
  }: UpdateJournalEntryDTO
) {
  let foundInventoryType: InventoryTypeEntity | null = null;
  if (inventoryTypeUUID) {
    foundInventoryType = await InventoryTypeEntity.findOneBy({
      uuid: inventoryTypeUUID,
    }).catch((e) => {
      console.error(
        "updateJournalEntryService -> InventoryTypeEntity.findOneBy: ",
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
  }

  let foundLedgerAccount: LedgerAccountEntity | null = null;
  if (ledgerAccountUUID) {
    foundLedgerAccount = await LedgerAccountEntity.findOneBy({
      uuid: ledgerAccountUUID,
    }).catch((e) => {
      console.error(
        "updateJournalEntryService -> LedgerAccountEntity.findOneBy: ",
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
  }

  await JournalEntryEntity.update(
    { uuid },
    {
      description: `Asiento de Activos Fijos correspondiente al periodo ${new Date().getFullYear()} - ${new Date().getMonth() + 1}`,
      ...(entry_date && { entry_date }),
      ...(amount && { amount: parseFloat(amount) }),
      ...(foundInventoryType && { inventoryType: foundInventoryType }),
      ...(foundLedgerAccount && { ledgerAccount: foundLedgerAccount }),
      ...(movementType && { movement_type: movementType }),
      ...(status && { status }),
    }
  ).catch((e) => {
    console.error(
      "updateJournalEntryService -> JournalEntryEntity.update: ",
      e
    );
    return null;
  });

  return "Journal entry updated successfully";
}
