import { Router } from "express";
import {
    createAssetTypeController,
    deleteAssetTypeController,
    getAllAssetTypeController,
    getOneAssetTypeController,
    updateAssetTypeController,
} from "../../../controllers/asset-type";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateAssetTypeDTO, UpdateAssetTypeDTO } from "../../../dto/asset-type.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateAssetTypeDTO), createAssetTypeController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteAssetTypeController);
router.get("/", getAllAssetTypeController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneAssetTypeController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateAssetTypeDTO)],
  updateAssetTypeController
);

export default router;