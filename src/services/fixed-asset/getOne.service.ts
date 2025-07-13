import { statusCode } from "../../utils/status.util";
import { FixedAssetEntity } from "../../database/entities/entity/fixed-asset.entity";
import { FindOneOptions } from "typeorm";

export async function getOneFixedAssetService(
  option: FindOneOptions<FixedAssetEntity>
) {
  const foundFixedAsset = await FixedAssetEntity.findOne(option).catch((e) => {
    console.error("getOneFixedAssetService -> FixedAssetEntity.findOne: ", e);
    return null;
  });

  if (!foundFixedAsset) {
    return Promise.reject({
      message: "Fixed asset not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundFixedAsset;
}
