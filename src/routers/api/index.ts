import { Router } from "express";
import { authMiddleware } from "./../../middlewares/auth/auth.middleware";
import { unless } from "./../../utils/unless.util";

import auth from "./auth";
import accounting from "./accounting";
import department from "./department";
import employee from "./employee";
import user from "./user";
import inventoryType from "./inventory-type";
import ledgerAccount from "./ledger-account";
import assetType from "./asset-type";
import journalEntry from "./journal-entry";
import fixedAsset from "./fixed-asset";
import depreciationCalculation from "./depreciation-calculation";

const router = Router();

router.use(
  "/auth",
  unless([{ path: "/sign-in", method: "POST" }], authMiddleware),
  auth
);
router.use("/accounting", authMiddleware, accounting);
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
router.use("/users", authMiddleware, user);
router.use("/employees", authMiddleware, employee);
router.use("/inventory-types", authMiddleware, inventoryType);
router.use("/ledger-accounts", authMiddleware, ledgerAccount);
router.use("/asset-types", authMiddleware, assetType);
router.use("/journal-entries", authMiddleware, journalEntry);
router.use("/fixed-assets", authMiddleware, fixedAsset);
router.use(
  "/depreciation-calculations",
  authMiddleware,
  depreciationCalculation
);

export default router;
