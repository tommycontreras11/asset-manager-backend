import { Request, Response } from "express";
import { getOneDepreciationCalculationService } from "../../services/depreciation-calculation/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneDepreciationCalculationController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOneDepreciationCalculationService({
    where: {
      uuid,
    },
    relations: {
      fixedAsset: true,
    },
  })
    .then((data) => {
      const inventoryType = {
        uuid: data.uuid,
        process_date: data.process_date,
        depreciation_amount: data.depreciation_amount,
        accumulated_depreciation: data.accumulated_depreciation,
        fixedAsset: {
          uuid: data.fixedAsset.uuid,
          name: data.fixedAsset.name,
        },
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: inventoryType });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
