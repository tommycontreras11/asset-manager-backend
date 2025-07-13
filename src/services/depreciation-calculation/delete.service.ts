import { DepreciationCalculationEntity } from "../../database/entities/entity/depreciation-calculation.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteDepreciationCalculationService(uuid: string) {
  const foundDepreciationCalculation =
    await DepreciationCalculationEntity.findOneBy({ uuid }).catch((e) => {
      console.error(
        "deleteDepreciationCalculationService -> DepreciationCalculationEntity.findOneBy: ",
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

  await foundDepreciationCalculation.softRemove().catch((e) => {
    console.error(
      "deleteDepreciationCalculationService -> DepreciationCalculationEntity.update: ",
      e
    );
    return null;
  });

  return "Depreciation calculation deleted successfully";
}
