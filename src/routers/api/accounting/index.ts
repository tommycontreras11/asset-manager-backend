import { Router } from "express";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { createAccountingController } from "./../../../controllers/accounting";
import { CreateAccountingListDTO } from "./../../../dto/journal-entry.dto";

const router = Router();

router.post(
  "/",
  validateDTO(CreateAccountingListDTO),
  createAccountingController
);

export default router;
