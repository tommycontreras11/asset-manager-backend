import { Request, Response } from "express";
import { getAllFixedAssetService } from "../../services/fixed-asset/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllFixedAssetController = async (_req: Request, res: Response) => {
  getAllFixedAssetService({
    relations: {
      assetType: true,
      department: true,
      employee: true,
    }
  })
    .then((data) => {
      const fixedAssets = data.map((fixedAsset) => ({
        uuid: fixedAsset.uuid,
        name: fixedAsset.name,
        assetType: {
          uuid: fixedAsset.assetType.uuid,
          name: fixedAsset.assetType.name,
        },
        department: {
          uuid: fixedAsset.department.uuid,
          name: fixedAsset.department.name,
        },
        employee: {
          uuid: fixedAsset.employee.uuid,
          name: fixedAsset.employee.name,
        },
        status: fixedAsset.status,
      }));

      res.status(statusCode.OK).json({ data: fixedAssets });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
