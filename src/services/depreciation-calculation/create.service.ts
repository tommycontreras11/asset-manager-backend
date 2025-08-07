import { DepreciationCalculationEntity } from "../../database/entities/entity/depreciation-calculation.entity";
import { CreateDepreciationCalculationDTO } from "../../dto/depreciation-calculation.dto";
import { statusCode } from "../../utils/status.util";
import { FixedAssetEntity } from "./../../database/entities/entity/fixed-asset.entity";
import { getFullDate } from "./../../utils/date.util";

export async function createDepreciationCalculationService({
  process_date,
  fixedAssetUUID,
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

  const depreciation = calculateDepreciation({
    purchaseValue: foundFixedAsset.purchase_value,
    salvageValue: foundFixedAsset.salvage_value,
    usefulLife: foundFixedAsset.useful_life,
    startDate: new Date(foundFixedAsset.purchase_date),
    asOfDate: new Date(process_date),
  });

  await DepreciationCalculationEntity.create({
    process_date: getFullDate(new Date(process_date)),
    depreciation_amount: depreciation.monthlyDepreciation,
    accumulated_depreciation: depreciation.accumulatedDepreciation,
    fixedAsset: foundFixedAsset,
  })
    .save()
    .catch((e) => {
      console.error(
        "createDepreciationCalculationService -> DepreciationCalculationEntity.create: ",
        e
      );
      return null;
    });

  return "Depreciation calculation created successfully";
}

const calculateDepreciation = ({
  purchaseValue,
  salvageValue,
  usefulLife,
  startDate,
  asOfDate = new Date(),
}: {
  purchaseValue: number;
  salvageValue: number;
  usefulLife: number;
  startDate: Date;
  asOfDate?: Date;
}) => {
  const monthlyDepreciation = (purchaseValue - salvageValue) / usefulLife;

  const monthsUsed =
    (asOfDate.getFullYear() - startDate.getFullYear()) * 12 +
    (asOfDate.getMonth() - startDate.getMonth());

  const totalMonths = Math.min(monthsUsed, usefulLife); // stop at useful life
  const accumulatedDepreciation = monthlyDepreciation * totalMonths;

  return {
    monthlyDepreciation: +monthlyDepreciation.toFixed(2),
    accumulatedDepreciation: +accumulatedDepreciation.toFixed(2),
  };
};
