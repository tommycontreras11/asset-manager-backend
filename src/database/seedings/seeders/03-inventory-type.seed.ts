import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { InventoryTypeEntity } from "../../entities/entity/inventory-type.entity";
import { inventoryTypesData } from "../data/inventory-type.data";

export class InventoryTypeSeeder implements Seeder {
  async run(_factory: Factory, dataSource: DataSource): Promise<void> {
    const inventoryTypeRepo = dataSource.getRepository(InventoryTypeEntity);

    try {
      await Promise.all(
        inventoryTypesData.map(async (inventoryType) => {
          const exists = await inventoryTypeRepo.findOneBy({
            name: inventoryType.name,
          });

          if (exists) return;

          await inventoryTypeRepo.save({
            name: inventoryType.name,
            description: inventoryType.description,
          });
        })
      );
    } catch (error) {
      console.error("InventoryTypeSeeder -> run: ", error);
    }
  }
}
