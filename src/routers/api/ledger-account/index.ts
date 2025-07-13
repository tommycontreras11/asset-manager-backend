import { Router } from "express";
import {
    createLedgerAccountController,
    deleteLedgerAccountController,
    getAllLedgerAccountController,
    getOneLedgerAccountController,
    updateLedgerAccountController,
} from "../../../controllers/ledger-account";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateLedgerAccountDTO, UpdateLedgerAccountDTO } from "../../../dto/ledger-account.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateLedgerAccountDTO), createLedgerAccountController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteLedgerAccountController);
router.get("/", getAllLedgerAccountController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneLedgerAccountController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateLedgerAccountDTO)],
  updateLedgerAccountController
);

export default router;