import { InventoryTypeEntity } from "../../database/entities/entity/inventory-type.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteInventoryTypeService(uuid: string) {
  const foundInventoryType = await InventoryTypeEntity.findOneBy({ uuid }).catch((e) => {
    console.error("deleteInventoryTypeService -> InventoryTypeEntity.findOneBy: ", e);
    return null;
  });

  if (!foundInventoryType) {
    return Promise.reject({
      message: "Inventory type not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundInventoryType.softRemove().catch((e) => {
    console.error("deleteInventoryTypeService -> InventoryTypeEntity.update: ", e);
    return null;
  });

  return "Inventory type deleted successfully";
}
