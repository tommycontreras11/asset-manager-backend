import { DepreciationCalculationEntity } from "../../database/entities/entity/depreciation-calculation.entity";
import { UpdateDepreciationCalculationDTO } from "../../dto/depreciation-calculation.dto";
import { statusCode } from "../../utils/status.util";
import { FixedAssetEntity } from "./../../database/entities/entity/fixed-asset.entity";

export async function updateDepreciationCalculationService(
  uuid: string,
  {
    process_date,
    depreciation_amount,
    accumulated_depreciation,
    fixedAssetUUID,
    status,
  }: UpdateDepreciationCalculationDTO
) {
  const foundDepreciationCalculation =
    await DepreciationCalculationEntity.findOneBy({ uuid }).catch((e) => {
      console.error(
        "updateDepreciationCalculationService -> DepreciationCalculationEntity.findOneBy: ",
        e
      );
      return null;
    });

  if (!foundDepreciationCalculation) {
    return Promise.reject({
      message: "Depreciation calculation not found",
      status: statusCode.NOT_FOUND,
    });
  }

  let foundFixedAsset: FixedAssetEntity | null = null;
  if (fixedAssetUUID) {
    foundFixedAsset = await FixedAssetEntity.findOneBy({
      uuid: fixedAssetUUID,
    }).catch((e) => {
      console.error(
        "updateDepreciationCalculationService -> FixedAssetEntity.findOneBy: ",
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
  }

  await DepreciationCalculationEntity.update(
    { uuid },
    {
      ...(process_date && { process_date }),
      ...(depreciation_amount && {
        depreciation_amount: parseFloat(depreciation_amount),
      }),
      ...(accumulated_depreciation && {
        accumulated_depreciation: parseFloat(accumulated_depreciation),
      }),
      ...(foundFixedAsset && { fixedAsset: foundFixedAsset }),
      ...(status && { status }),
    }
  ).catch((e) => {
    console.error(
      "updateDepreciationCalculationService -> DepreciationCalculationEntity.update: ",
      e
    );
    return null;
  });

  return "Depreciation calculation updated successfully";
}
