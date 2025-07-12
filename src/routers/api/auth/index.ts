import { Router } from "express";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import {
    meController,
    signInController,
    signOutController
} from "./../../../controllers/auth";
import { SignInDTO } from "./../../../dto/auth.dto";

const router = Router();

router.post("/sign-in", validateDTO(SignInDTO), signInController);
router.post("/sign-out", signOutController);
router.get("/me", meController);

export default router;