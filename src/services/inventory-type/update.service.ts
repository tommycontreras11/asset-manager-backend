import { statusCode } from "../../utils/status.util";
import { InventoryTypeEntity } from "../../database/entities/entity/inventory-type.entity";
import { UpdateInventoryTypeDTO } from "../../dto/inventory-type.dto";
import { Not } from "typeorm";

export async function updateInventoryTypeService(
  uuid: string,
  { name, description, status }: UpdateInventoryTypeDTO
) {
  const foundInventoryType = await InventoryTypeEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateInventoryTypeService -> InventoryTypeEntity.findOneBy: ", e);
    return null;
  });

  if (!foundInventoryType) {
    return Promise.reject({
      message: "Inventory type not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (name) {
    const existingInventoryType = await InventoryTypeEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("updateInventoryTypeService -> InventoryTypeEntity.findOneBy: ", e);
      return null;
    });

    if (existingInventoryType) {
      return Promise.reject({
        message: "Inventory type already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  await InventoryTypeEntity.update(
    { uuid },
    { 
      ...(name && { name }),
      ...(description && { description }), 
      ...(status && { status }) 
    }
  ).catch((e) => {
    console.error("updateInventoryTypeService -> InventoryTypeEntity.update: ", e);
    return null;
  });

  return "Inventory type updated successfully";
}