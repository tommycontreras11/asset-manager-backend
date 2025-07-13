import { statusCode } from "../../utils/status.util";
import { LedgerAccountEntity } from "../../database/entities/entity/ledger-account.entity";
import { FindOneOptions } from "typeorm";

export async function getOneLedgerAccountService(
  option: FindOneOptions<LedgerAccountEntity>
) {
  const foundLedgerAccount = await LedgerAccountEntity.findOne(option).catch((e) => {
    console.error("getOneLedgerAccountService -> LedgerAccountEntity.findOne: ", e);
    return null;
  });

  if (!foundLedgerAccount) {
    return Promise.reject({
      message: "Ledger account not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundLedgerAccount;
}
