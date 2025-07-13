import { Request, Response } from "express";
import { getAllDepreciationCalculationService } from "../../services/depreciation-calculation/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllDepreciationCalculationController = async (_req: Request, res: Response) => {
  getAllDepreciationCalculationService({
    relations: {
      fixedAsset: true
    }
  })
    .then((data) => {
      const depreciationCalculations = data.map((depreciationCalculation) => ({
        uuid: depreciationCalculation.uuid,
        process_date: depreciationCalculation.process_date,
        depreciation_amount: depreciationCalculation.depreciation_amount,
        accumulated_depreciation: depreciationCalculation.accumulated_depreciation,
        fixedAsset: {
          uuid: depreciationCalculation.fixedAsset.uuid,
          name: depreciationCalculation.fixedAsset.name
        },
        status: depreciationCalculation.status,
      }));

      res.status(statusCode.OK).json({ data: depreciationCalculations });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
