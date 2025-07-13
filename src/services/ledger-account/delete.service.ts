import { LedgerAccountEntity } from "../../database/entities/entity/ledger-account.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteLedgerAccountService(uuid: string) {
  const foundLedgerAccount = await LedgerAccountEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateLedgerAccountService -> LedgerAccountEntity.findOneBy: ", e);
    return null;
  });

  if (!foundLedgerAccount) {
    return Promise.reject({
      message: "Ledger account not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundLedgerAccount.softRemove().catch((e) => {
    console.error("updateLedgerAccountService -> LedgerAccountEntity.update: ", e);
    return null;
  });

  return "Ledger account deleted successfully";
}
