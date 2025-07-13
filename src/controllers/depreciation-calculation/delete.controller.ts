import { Request, Response } from "express";
import { deleteDepreciationCalculationService } from "../../services/depreciation-calculation/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteDepreciationCalculationController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteDepreciationCalculationService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
