import { statusCode } from "../../utils/status.util";
import { DepreciationCalculationEntity } from "../../database/entities/entity/depreciation-calculation.entity";
import { FindManyOptions } from "typeorm";

export async function getAllDepreciationCalculationService(
  options?: FindManyOptions<DepreciationCalculationEntity>
) {
  const depreciationCalculations = await DepreciationCalculationEntity.find(options).catch((e) => {
    console.error("getAllDepreciationCalculationService -> DepreciationCalculationEntity.find: ", e);
    return null;
  });

  if (!depreciationCalculations)
    return Promise.reject({
      message: "No depreciation calculations found",
      status: statusCode.NOT_FOUND,
    });

  return depreciationCalculations;
}
