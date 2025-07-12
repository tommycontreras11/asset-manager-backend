import { statusCode } from "../../utils/status.util";
import { InventoryTypeEntity } from "../../database/entities/entity/inventory-type.entity";
import { FindManyOptions } from "typeorm";

export async function getAllInventoryTypeService(
  options?: FindManyOptions<InventoryTypeEntity>
) {
  const inventoryTypes = await InventoryTypeEntity.find(options).catch((e) => {
    console.error("getAllInventoryTypeService -> InventoryTypeEntity.find: ", e);
    return null;
  });

  if (!inventoryTypes)
    return Promise.reject({
      message: "No inventory types found",
      status: statusCode.NOT_FOUND,
    });

  return inventoryTypes;
}
