import { Request, Response } from "express";
import { getAllAssetTypeService } from "../../services/asset-type/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllAssetTypeController = async (_req: Request, res: Response) => {
  getAllAssetTypeService({
    relations: {
      purchaseAccount: true,
      depreciationAccount: true
    }
  })
    .then((data) => {
      const assetTypes = data.map((assetType) => ({
        uuid: assetType.uuid,
        name: assetType.name,
        purchaseAccount: {
          uuid: assetType.purchaseAccount.uuid,
          name: assetType.purchaseAccount.name,
        },
        depreciationAccount: {
          uuid: assetType.depreciationAccount.uuid,
          name: assetType.depreciationAccount.name,
        },
        status: assetType.status,
      }));

      res.status(statusCode.OK).json({ data: assetTypes });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
