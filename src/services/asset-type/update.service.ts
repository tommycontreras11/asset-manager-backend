import { Not } from "typeorm";
import { AssetTypeEntity } from "../../database/entities/entity/asset-type.entity";
import { UpdateAssetTypeDTO } from "../../dto/asset-type.dto";
import { statusCode } from "../../utils/status.util";
import { LedgerAccountEntity } from "./../../database/entities/entity/ledger-account.entity";

export async function updateAssetTypeService(
  uuid: string,
  {
    name,
    purchaseAccountUUID,
    depreciationAccountUUID,
    status,
  }: UpdateAssetTypeDTO
) {
  const foundAssetType = await AssetTypeEntity.findOneBy({ uuid }).catch(
    (e) => {
      console.error("updateAssetTypeService -> AssetTypeEntity.findOneBy: ", e);
      return null;
    }
  );

  if (!foundAssetType) {
    return Promise.reject({
      message: "Asset type not found",
      status: statusCode.NOT_FOUND,
    });
  }

  let foundPurchaseAccount: LedgerAccountEntity | null = null;
  if (purchaseAccountUUID) {
    foundPurchaseAccount = await LedgerAccountEntity.findOneBy({
      uuid: purchaseAccountUUID,
    }).catch((e) => {
      console.error(
        "updateAssetTypeService -> LedgerAccountEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundPurchaseAccount) {
      return Promise.reject({
        message: "Purchase account not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  let foundDepreciationAccount: LedgerAccountEntity | null = null;
  if (depreciationAccountUUID) {
    foundDepreciationAccount = await LedgerAccountEntity.findOneBy({
      uuid: depreciationAccountUUID,
    }).catch((e) => {
      console.error(
        "updateAssetTypeService -> LedgerAccountEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundDepreciationAccount) {
      return Promise.reject({
        message: "Depreciation account not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  if (foundPurchaseAccount && foundDepreciationAccount) {
    if (foundPurchaseAccount.type === foundDepreciationAccount.type)
      return Promise.reject({
        message: "Depreciation account and purchase account must be different",
        status: statusCode.BAD_REQUEST,
      });
  }

  if (name) {
    const existingAssetType = await AssetTypeEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("updateAssetTypeService -> AssetTypeEntity.findOneBy: ", e);
      return null;
    });

    if (existingAssetType) {
      return Promise.reject({
        message: "Asset type already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  await AssetTypeEntity.update(
    { uuid },
    {
      ...(name && { name }),
      ...(foundPurchaseAccount && { purchaseAccount: foundPurchaseAccount }),
      ...(foundDepreciationAccount && {
        depreciationAccount: foundDepreciationAccount,
      }),
      ...(status && { status }),
    }
  ).catch((e) => {
    console.error("updateAssetTypeService -> AssetTypeEntity.update: ", e);
    return null;
  });

  return "Asset type updated successfully";
}
