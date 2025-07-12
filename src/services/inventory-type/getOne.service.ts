import { statusCode } from "../../utils/status.util";
import { InventoryTypeEntity } from "../../database/entities/entity/inventory-type.entity";
import { FindOneOptions } from "typeorm";

export async function getOneInventoryTypeService(
  option: FindOneOptions<InventoryTypeEntity>
) {
  const foundInventoryType = await InventoryTypeEntity.findOne(option).catch((e) => {
    console.error("getOneInventoryTypeService -> InventoryTypeEntity.findOne: ", e);
    return null;
  });

  if (!foundInventoryType) {
    return Promise.reject({
      message: "InventoryType not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundInventoryType;
}
