import { statusCode } from "../../utils/status.util";
import { LedgerAccountEntity } from "../../database/entities/entity/ledger-account.entity";
import { FindManyOptions } from "typeorm";

export async function getAllLedgerAccountService(
  options?: FindManyOptions<LedgerAccountEntity>
) {
  const ledgerAccounts = await LedgerAccountEntity.find(options).catch((e) => {
    console.error("getAllLedgerAccountService -> LedgerAccountEntity.find: ", e);
    return null;
  });

  if (!ledgerAccounts)
    return Promise.reject({
      message: "No ledger accounts found",
      status: statusCode.NOT_FOUND,
    });

  return ledgerAccounts;
}
