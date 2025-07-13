import { LedgerAccountEntity } from "./../../database/entities/entity/ledger-account.entity";
import { AssetTypeEntity } from "../../database/entities/entity/asset-type.entity";
import { CreateAssetTypeDTO } from "../../dto/asset-type.dto";
import { statusCode } from "../../utils/status.util";

export async function createAssetTypeService({
  name,
  purchaseAccountUUID,
  depreciationAccountUUID,
}: CreateAssetTypeDTO) {
  const foundAssetType = await AssetTypeEntity.findOneBy({ name }).catch(
    (e) => {
      console.error("createAssetTypeService -> AssetTypeEntity.findOneBy: ", e);
      return null;
    }
  );

  if (foundAssetType) {
    return Promise.reject({
      message: "Asset type already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  const foundPurchaseAccount = await LedgerAccountEntity.findOneBy({
    uuid: purchaseAccountUUID,
  }).catch((e) => {
    console.error(
      "createAssetTypeService -> LedgerAccountEntity.findOneBy: ",
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

  const foundDepreciationAccount = await LedgerAccountEntity.findOneBy({
    uuid: depreciationAccountUUID,
  }).catch((e) => {
    console.error(
      "createAssetTypeService -> LedgerAccountEntity.findOneBy: ",
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

  if (foundPurchaseAccount.type === foundDepreciationAccount.type) {
    return Promise.reject({
      message: "Depreciation account and purchase account must be different",
      status: statusCode.BAD_REQUEST,
    });
  }

  await AssetTypeEntity.create({
    name,
    purchaseAccount: foundPurchaseAccount,
    depreciationAccount: foundDepreciationAccount,
  })
    .save()
    .catch((e) => {
      console.error("createAssetTypeService -> AssetTypeEntity.create: ", e);
      return null;
    });

  return "Asset type created successfully";
}
