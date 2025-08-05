import {
  LedgerAccountEntity,
  LedgerAccountTypeEnum,
} from "../../database/entities/entity/ledger-account.entity";
import { statusCode } from "../../utils/status.util";
import { MovementType } from "./../../database/entities/entity/journal-entry.entity";
import { CreateAccountingListDTO } from "./../../dto/journal-entry.dto";
import { getFullDate } from "./../../utils/date.util";

interface IAccountingPayload {
  descripcion: string;
  cuenta_Id: string;
  auxiliar_Id: string;
  tipoMovimiento: MovementType;
  fechaAsiento: string;
  montoAsiento: string;
}

export async function createAccountingService(
  accounting: CreateAccountingListDTO
) {
  const accountingPayload = await recursiveGetDataToSendToAccounting(
    accounting
  );

  return accountingPayload;
}

const recursiveGetDataToSendToAccounting = async ({
  accounting,
}: CreateAccountingListDTO): Promise<unknown> => {
  const payload = accounting.pop();

  const accountingPayload: IAccountingPayload[] = [];

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

  accountingPayload.push({
    descripcion: payload.description,
    cuenta_Id: `${foundLedgerAccount.id}`,
    auxiliar_Id: "8",
    tipoMovimiento: payload.movementType,
    fechaAsiento: getFullDate(payload.entry_date),
    montoAsiento: payload.amount,
  });

  return createAccountingService({ accounting: [payload] });
};
