import { Router } from "express";
import { authMiddleware } from "./../../middlewares/auth/auth.middleware";
import { unless } from "./../../utils/unless.util";

import department from "./department";

const router = Router();

router.use(
  "/departments",
  // unless(
  //   [
  //     {
  //       path: "/",
  //       method: "GET",
  //     },
  //   ],
  //   authMiddleware
  // ),
  department
);

export default router;
