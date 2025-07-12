import { Router } from "express";
import {
    createInventoryTypeController,
    deleteInventoryTypeController,
    getAllInventoryTypeController,
    getOneInventoryTypeController,
    updateInventoryTypeController,
} from "../../../controllers/inventory-type";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateInventoryTypeDTO, UpdateInventoryTypeDTO } from "../../../dto/inventory-type.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateInventoryTypeDTO), createInventoryTypeController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteInventoryTypeController);
router.get("/", getAllInventoryTypeController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneInventoryTypeController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateInventoryTypeDTO)],
  updateInventoryTypeController
);

export default router;