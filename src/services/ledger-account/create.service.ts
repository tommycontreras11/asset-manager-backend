import { LedgerAccountEntity } from "../../database/entities/entity/ledger-account.entity";
import { CreateLedgerAccountDTO } from "../../dto/ledger-account.dto";
import { statusCode } from "../../utils/status.util";

export async function createLedgerAccountService({ name, ...payload }: CreateLedgerAccountDTO) {
  const foundLedgerAccount = await LedgerAccountEntity.findOneBy({ name }).catch((e) => {
    console.error("createLedgerAccountService -> LedgerAccountEntity.findOneBy: ", e);
    return null;
  });

  if (foundLedgerAccount) {
    return Promise.reject({
      message: "Ledger account already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  await LedgerAccountEntity.create({
    name,
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("createLedgerAccountService -> LedgerAccountEntity.create: ", e);
      return null;
    });

  return "Ledger account created successfully";
}
