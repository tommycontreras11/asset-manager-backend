import { Request, Response } from "express";
import { getOneFixedAssetService } from "../../services/fixed-asset/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneFixedAssetController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOneFixedAssetService({
    where: {
      uuid,
    },
    relations: {
      assetType: true,
      department: true,
      employee: true,
    },
  })
    .then((data) => {
      const fixedAsset = {
        uuid: data.uuid,
        name: data.name,
        purchase_value: data.purchase_value,
        accumulated_depreciation: data.accumulated_depreciation,
        assetType: {
          uuid: data.assetType.uuid,
          name: data.assetType.name,
        },
        department: {
          uuid: data.department.uuid,
          name: data.department.name,
        },
        employee: {
          uuid: data.employee.uuid,
          name: data.employee.name,
        },
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: fixedAsset });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
