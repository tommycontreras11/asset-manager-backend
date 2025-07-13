import { Request, Response } from "express";
import { updateDepreciationCalculationService } from "../../services/depreciation-calculation/update.service";
import { statusCode } from "../../utils/status.util";

export const updateDepreciationCalculationController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  updateDepreciationCalculationService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
