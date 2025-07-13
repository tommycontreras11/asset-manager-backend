import { Router } from "express";
import {
    createDepreciationCalculationController,
    deleteDepreciationCalculationController,
    getAllDepreciationCalculationController,
    getOneDepreciationCalculationController,
    updateDepreciationCalculationController,
} from "../../../controllers/depreciation-calculation";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateDepreciationCalculationDTO, UpdateDepreciationCalculationDTO } from "../../../dto/depreciation-calculation.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateDepreciationCalculationDTO), createDepreciationCalculationController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteDepreciationCalculationController);
router.get("/", getAllDepreciationCalculationController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneDepreciationCalculationController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateDepreciationCalculationDTO)],
  updateDepreciationCalculationController
);

export default router;