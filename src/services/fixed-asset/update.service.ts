import { Not } from "typeorm";
import { FixedAssetEntity } from "../../database/entities/entity/fixed-asset.entity";
import { statusCode } from "../../utils/status.util";
import { AssetTypeEntity } from "./../../database/entities/entity/asset-type.entity";
import { DepartmentEntity } from "./../../database/entities/entity/department.entity";
import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";
import { UpdateFixedAssetDTO } from "./../../dto/fixed-asset.dto";
import { getFullDate } from "./../../utils/date.util";

export async function updateFixedAssetService(
  uuid: string,
  {
    name,
    purchase_value,
    salvage_value,
    useful_life,
    accumulated_depreciation,
    purchase_date,
    start_use_date,
    departmentUUID,
    assetTypeUUID,
    employeeUUID, 
    status,
  }: UpdateFixedAssetDTO
) {
  const foundFixedAsset = await FixedAssetEntity.findOneBy({ uuid }).catch(
    (e) => {
      console.error(
        "updateFixedAssetService -> FixedAssetEntity.findOneBy: ",
        e
      );
      return null;
    }
  );

  if (!foundFixedAsset)
    return Promise.reject({
      message: "Fixed asset not found",
      status: statusCode.NOT_FOUND,
    });

  let foundDepartment: DepartmentEntity | null = null;
  if (departmentUUID) {
    foundDepartment = await DepartmentEntity.findOneBy({
      uuid: departmentUUID,
    }).catch((e) => {
      console.error(
        "updateFixedAssetService -> DepartmentEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundDepartment) {
      return Promise.reject({
        message: "Department not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  if (name) {
    const existingFixedAsset = await FixedAssetEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error(
        "updateFixedAssetService -> FixedAssetEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (existingFixedAsset) {
      return Promise.reject({
        message: "Fixed asset already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  let foundAssetType: AssetTypeEntity | null = null;
  if (assetTypeUUID) {
    foundAssetType = await AssetTypeEntity.findOneBy({
      uuid: assetTypeUUID,
    }).catch((e) => {
      console.error(
        "updateFixedAssetService -> AssetTypeEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundAssetType) {
      return Promise.reject({
        message: "Asset type not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  let foundEmployee: EmployeeEntity | null = null;
  if (employeeUUID) {
    foundEmployee = await EmployeeEntity.findOneBy({
      uuid: employeeUUID,
    }).catch((e) => {
      console.error(
        "createFixedAssetService -> AssetTypeEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundEmployee) {
      return Promise.reject({
        message: "Employee not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  await FixedAssetEntity.update(
    { uuid },
    {
      ...(name && { name }),
      ...(purchase_value && { purchase_value: parseFloat(purchase_value) }),
      ...(salvage_value && { salvage_value: parseFloat(salvage_value) }),
      ...(useful_life && { useful_life: parseInt(useful_life) }),
      ...(accumulated_depreciation && {
        accumulated_depreciation: parseFloat(accumulated_depreciation),
      }),
      ...(purchase_date && {
        purchase_date: getFullDate(new Date(purchase_date)),
      }),
      ...(start_use_date && {
        start_use_date: getFullDate(new Date(start_use_date)),
      }),
      ...(foundDepartment && { department: foundDepartment }),
      ...(foundAssetType && { assetType: foundAssetType }),
      ...(foundEmployee && { employee: foundEmployee }),
      ...(status && { status }),
    }
  ).catch((e) => {
    console.error("updateFixedAssetService -> FixedAssetEntity.update: ", e);
    return null;
  });

  return "Fixed asset updated successfully";
}
