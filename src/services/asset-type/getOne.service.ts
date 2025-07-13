import { statusCode } from "../../utils/status.util";
import { AssetTypeEntity } from "../../database/entities/entity/asset-type.entity";
import { FindOneOptions } from "typeorm";

export async function getOneAssetTypeService(
  option: FindOneOptions<AssetTypeEntity>
) {
  const foundAssetType = await AssetTypeEntity.findOne(option).catch((e) => {
    console.error("getOneAssetTypeService -> AssetTypeEntity.findOne: ", e);
    return null;
  });

  if (!foundAssetType) {
    return Promise.reject({
      message: "Asset type not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundAssetType;
}
