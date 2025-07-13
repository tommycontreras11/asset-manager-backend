import { AssetTypeEntity } from "../../database/entities/entity/asset-type.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteAssetTypeService(uuid: string) {
  const foundAssetType = await AssetTypeEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateAssetTypeService -> AssetTypeEntity.findOneBy: ", e);
    return null;
  });

  if (!foundAssetType) {
    return Promise.reject({
      message: "Asset type not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundAssetType.softRemove().catch((e) => {
    console.error("updateAssetTypeService -> AssetTypeEntity.update: ", e);
    return null;
  });

  return "Asset type deleted successfully";
}
