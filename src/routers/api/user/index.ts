import { Router } from "express";
import {
    createUserController,
    deleteUserController,
    getAllUserController,
    getOneUserController,
    updateUserController,
} from "../../../controllers/user";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateUserDTO, UpdateUserDTO } from "../../../dto/user.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateUserDTO), createUserController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteUserController);
router.get("/", getAllUserController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneUserController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateUserDTO)],
  updateUserController
);

export default router;