import { FixedAssetEntity } from "../../database/entities/entity/fixed-asset.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteFixedAssetService(uuid: string) {
  const foundFixedAsset = await FixedAssetEntity.findOneBy({ uuid }).catch((e) => {
    console.error("deleteFixedAssetService -> FixedAssetEntity.findOneBy: ", e);
    return null;
  });

  if (!foundFixedAsset) {
    return Promise.reject({
      message: "Fixed asset not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundFixedAsset.softRemove().catch((e) => {
    console.error("deleteFixedAssetService -> FixedAssetEntity.update: ", e);
    return null;
  });

  return "Fixed asset deleted successfully";
}
