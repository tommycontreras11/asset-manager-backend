import { Router } from "express";
import {
    createJournalEntryController,
    deleteJournalEntryController,
    getAllJournalEntryController,
    getOneJournalEntryController,
    updateJournalEntryController,
} from "../../../controllers/journal-entry";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateJournalEntryDTO, UpdateJournalEntryDTO } from "../../../dto/journal-entry.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateJournalEntryDTO), createJournalEntryController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteJournalEntryController);
router.get("/", getAllJournalEntryController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneJournalEntryController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateJournalEntryDTO)],
  updateJournalEntryController
);

export default router;