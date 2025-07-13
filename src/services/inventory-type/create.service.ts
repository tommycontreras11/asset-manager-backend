import { InventoryTypeEntity } from "../../database/entities/entity/inventory-type.entity";
import { CreateInventoryTypeDTO } from "../../dto/inventory-type.dto";
import { statusCode } from "../../utils/status.util";

export async function createInventoryTypeService({ name, description }: CreateInventoryTypeDTO) {
  const foundInventoryType = await InventoryTypeEntity.findOneBy({ name }).catch((e) => {
    console.error("createInventoryTypeService -> InventoryTypeEntity.findOneBy: ", e);
    return null;
  });

  if (foundInventoryType) {
    return Promise.reject({
      message: "Inventory type already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  await InventoryTypeEntity.create({
    name,
    ...(description && { description }),
  })
    .save()
    .catch((e) => {
      console.error("createInventoryTypeService -> InventoryTypeEntity.create: ", e);
      return null;
    });

  return "Inventory type created successfully";
}
