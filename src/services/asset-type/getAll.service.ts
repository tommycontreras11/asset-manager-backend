import { statusCode } from "../../utils/status.util";
import { AssetTypeEntity } from "../../database/entities/entity/asset-type.entity";
import { FindManyOptions } from "typeorm";

export async function getAllAssetTypeService(
  options?: FindManyOptions<AssetTypeEntity>
) {
  const assetTypes = await AssetTypeEntity.find(options).catch((e) => {
    console.error("getAllAssetTypeService -> AssetTypeEntity.find: ", e);
    return null;
  });

  if (!assetTypes)
    return Promise.reject({
      message: "No asset types found",
      status: statusCode.NOT_FOUND,
    });

  return assetTypes;
}
