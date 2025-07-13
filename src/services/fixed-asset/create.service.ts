import { AssetTypeEntity } from "./../../database/entities/entity/asset-type.entity";
import { DepartmentEntity } from "./../../database/entities/entity/department.entity";
import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";
import { FixedAssetEntity } from "../../database/entities/entity/fixed-asset.entity";
import { CreateFixedAssetDTO } from "../../dto/fixed-asset.dto";
import { statusCode } from "../../utils/status.util";

export async function createFixedAssetService({
  name,
  purchase_value,
  accumulated_depreciation,
  departmentUUID,
  assetTypeUUID,
  employeeUUID,
}: CreateFixedAssetDTO) {
  const foundFixedAsset = await FixedAssetEntity.findOneBy({ name }).catch(
    (e) => {
      console.error(
        "createFixedAssetService -> FixedAssetEntity.findOneBy: ",
        e
      );
      return null;
    }
  );

  if (foundFixedAsset) {
    return Promise.reject({
      message: "Asset type already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  const foundDepartment = await DepartmentEntity.findOneBy({
    uuid: departmentUUID,
  }).catch((e) => {
    console.error("createFixedAssetService -> DepartmentEntity.findOneBy: ", e);
    return null;
  });

  if (!foundDepartment) {
    return Promise.reject({
      message: "Department not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundAssetType = await AssetTypeEntity.findOneBy({
    uuid: assetTypeUUID,
  }).catch((e) => {
    console.error("createFixedAssetService -> AssetTypeEntity.findOneBy: ", e);
    return null;
  });

  if (!foundAssetType) {
    return Promise.reject({
      message: "Asset type not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundEmployee = await EmployeeEntity.findOneBy({
    uuid: employeeUUID,
  }).catch((e) => {
    console.error("createFixedAssetService -> AssetTypeEntity.findOneBy: ", e);
    return null;
  });

  if (!foundEmployee) {
    return Promise.reject({
      message: "Employee not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await FixedAssetEntity.create({
    name,
    purchase_value: parseFloat(purchase_value),
    accumulated_depreciation: parseFloat(accumulated_depreciation),
    department: foundDepartment,
    assetType: foundAssetType,
    employee: foundEmployee,
  })
    .save()
    .catch((e) => {
      console.error("createFixedAssetService -> FixedAssetEntity.create: ", e);
      return null;
    });

  return "Fixed asset created successfully";
}
