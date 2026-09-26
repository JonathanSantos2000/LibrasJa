import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import * as postController from "../controllers/post.controllers";

const router: Router = Router();

router.post(
  "/register",
  authMiddleware,
  roleMiddleware([1, 2]),
  postController.register,
);

export default router;
