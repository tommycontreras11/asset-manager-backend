import { DepreciationCalculationEntity } from "../../database/entities/entity/depreciation-calculation.entity";
import { CreateDepreciationCalculationDTO } from "../../dto/depreciation-calculation.dto";
import { statusCode } from "../../utils/status.util";
import { FixedAssetEntity } from "./../../database/entities/entity/fixed-asset.entity";

export async function createDepreciationCalculationService({
  process_date,
  depreciation_amount,
  accumulated_depreciation,
  fixedAssetUUID
}: CreateDepreciationCalculationDTO) {
  const foundFixedAsset = await FixedAssetEntity.findOneBy({
    uuid: fixedAssetUUID,
  }).catch((e) => {
    console.error(
      "createDepreciationCalculationService -> FixedAssetEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundFixedAsset) {
    return Promise.reject({
      message: "Fixed asset not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await DepreciationCalculationEntity.create({
    process_date,
    depreciation_amount: parseFloat(depreciation_amount),
    accumulated_depreciation: parseFloat(accumulated_depreciation),
    fixedAsset: foundFixedAsset,
  })
    .save()
    .catch((e) => {
      console.error("createDepreciationCalculationService -> DepreciationCalculationEntity.create: ", e);
      return null;
    });

  return "Depreciation calculation created successfully";
}
