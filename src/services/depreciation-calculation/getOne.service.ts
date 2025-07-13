import { statusCode } from "../../utils/status.util";
import { DepreciationCalculationEntity } from "../../database/entities/entity/depreciation-calculation.entity";
import { FindOneOptions } from "typeorm";

export async function getOneDepreciationCalculationService(
  option: FindOneOptions<DepreciationCalculationEntity>
) {
  const foundDepreciationCalculation = await DepreciationCalculationEntity.findOne(option).catch((e) => {
    console.error("getOneDepreciationCalculationService -> DepreciationCalculationEntity.findOne: ", e);
    return null;
  });

  if (!foundDepreciationCalculation) {
    return Promise.reject({
      message: "Depreciation calculation not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundDepreciationCalculation;
}
