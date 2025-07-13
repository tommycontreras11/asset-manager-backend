import { statusCode } from "../../utils/status.util";
import { FixedAssetEntity } from "../../database/entities/entity/fixed-asset.entity";
import { FindManyOptions } from "typeorm";

export async function getAllFixedAssetService(
  options?: FindManyOptions<FixedAssetEntity>
) {
  const fixedAssets = await FixedAssetEntity.find(options).catch((e) => {
    console.error("getAllFixedAssetService -> FixedAssetEntity.find: ", e);
    return null;
  });

  if (!fixedAssets)
    return Promise.reject({
      message: "No fixed assets found",
      status: statusCode.NOT_FOUND,
    });

  return fixedAssets;
}
