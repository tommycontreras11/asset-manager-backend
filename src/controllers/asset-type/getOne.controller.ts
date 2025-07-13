import { Request, Response } from "express";
import { getOneAssetTypeService } from "../../services/asset-type/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneAssetTypeController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOneAssetTypeService({
    where: {
      uuid,
    },
    relations: {
      purchaseAccount: true,
      depreciationAccount: true,
    },
  })
    .then((data) => {
      const assetType = {
        uuid: data.uuid,
        name: data.name,
        purchaseAccount: {
          uuid: data.purchaseAccount.uuid,
          name: data.purchaseAccount.name,
        },
        depreciationAccount: {
          uuid: data.depreciationAccount.uuid,
          name: data.depreciationAccount.name,
        },
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: assetType });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
