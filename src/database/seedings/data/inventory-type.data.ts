import { InventoryTypeEntity } from "./../../../database/entities/entity/inventory-type.entity";

const inventoryTypes = [
  {
    name: "Fixed Assets",
    description: "Long-term assets such as furniture, equipment, and vehicles.",
  },
  {
    name: "Spare Parts",
    description: "Components used for asset maintenance and repair.",
  },
  {
    name: "Maintenance Supplies",
    description: "Consumables like oil, cleaning agents, and tools.",
  },
  {
    name: "Office Equipment",
    description: "Items such as printers, computers, and monitors.",
  },
  {
    name: "IT Hardware",
    description:
      "Technology-related hardware assigned to employees or departments.",
  },
  {
    name: "Construction Materials",
    description:
      "Materials used in facility improvements or asset installations.",
  },
  {
    name: "Fleet Vehicles",
    description: "Vehicles used for operational or administrative purposes.",
  },
  {
    name: "Leased Equipment",
    description: "Assets under lease contracts, tracked but not owned.",
  },
  {
    name: "Disposables",
    description:
      "Low-cost, short-life items not capitalized but still tracked.",
  },
  {
    name: "Other Inventory",
    description:
      "Generic category for inventory not fitting other classifications.",
  },
];

export const inventoryTypesData: Partial<InventoryTypeEntity>[] =
  inventoryTypes.map((inventoryType) => ({
    name: inventoryType.name,
    description: inventoryType.description,
  }));
