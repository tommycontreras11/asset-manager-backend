import { Router } from "express";
import {
    createFixedAssetController,
    deleteFixedAssetController,
    getAllFixedAssetController,
    getOneFixedAssetController,
    updateFixedAssetController,
} from "../../../controllers/fixed-asset";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateFixedAssetDTO, UpdateFixedAssetDTO } from "../../../dto/fixed-asset.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateFixedAssetDTO), createFixedAssetController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteFixedAssetController);
router.get("/", getAllFixedAssetController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneFixedAssetController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateFixedAssetDTO)],
  updateFixedAssetController
);

export default router;