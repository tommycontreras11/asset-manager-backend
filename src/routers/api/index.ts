import { Router } from "express";
import { authMiddleware } from "./../../middlewares/auth/auth.middleware";
import { unless } from "./../../utils/unless.util";

import auth from "./auth";
import department from "./department";
import employee from "./employee";
import user from "./user";
import inventoryType from "./inventory-type";
import ledgerAccount from "./ledger-account";

const router = Router();

router.use(
  "/auth",
  unless(
    [
      { path: "/sign-in", method: "POST" },
    ],
    authMiddleware
  ),
  auth
);
router.use(
  "/departments",
  unless(
    [
      {
        path: "/",
        method: "GET",
      },
    ],
    authMiddleware
  ),
  department
);
router.use(
  "/users",
  authMiddleware,
  user
);
router.use(
  "/employees",
  authMiddleware,
  employee
);
router.use(
  "/inventory-types",
  authMiddleware,
  inventoryType
);
router.use(
  "/ledger-accounts",
  authMiddleware,
  ledgerAccount
);

export default router;
