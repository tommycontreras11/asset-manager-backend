import { Router } from "express";
import {
    createEmployeeController,
    deleteEmployeeController,
    getAllEmployeeController,
    getOneEmployeeController,
    updateEmployeeController,
} from "../../../controllers/employee";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateEmployeeDTO, UpdateEmployeeDTO } from "../../../dto/employee.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateEmployeeDTO), createEmployeeController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteEmployeeController);
router.get("/", getAllEmployeeController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneEmployeeController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateEmployeeDTO)],
  updateEmployeeController
);

export default router;