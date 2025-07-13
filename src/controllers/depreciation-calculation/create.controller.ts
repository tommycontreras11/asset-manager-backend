import { Request, Response } from "express";
import { createDepreciationCalculationService } from "../../services/depreciation-calculation/create.service";
import { statusCode } from "../../utils/status.util";

export const createDepreciationCalculationController = async (req: Request, res: Response) => {
  createDepreciationCalculationService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
