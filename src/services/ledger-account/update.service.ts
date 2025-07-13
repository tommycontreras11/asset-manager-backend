import { statusCode } from "../../utils/status.util";
import { LedgerAccountEntity } from "../../database/entities/entity/ledger-account.entity";
import { UpdateLedgerAccountDTO } from "../../dto/ledger-account.dto";
import { Not } from "typeorm";

export async function updateLedgerAccountService(
  uuid: string,
  { code, name, type, status }: UpdateLedgerAccountDTO
) {
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

  if (name) {
    const existingLedgerAccount = await LedgerAccountEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("updateLedgerAccountService -> LedgerAccountEntity.findOneBy: ", e);
      return null;
    });

    if (existingLedgerAccount) {
      return Promise.reject({
        message: "Ledger account already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  await LedgerAccountEntity.update(
    { uuid },
    { 
      ...(code && { code }),
      ...(name && { name }),
      ...(type && { type }),
      ...(status && { status }) 
    }
  ).catch((e) => {
    console.error("updateLedgerAccountService -> LedgerAccountEntity.update: ", e);
    return null;
  });

  return "Ledger account updated successfully";
}