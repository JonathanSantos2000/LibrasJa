import { Router } from "express";
import * as userController from "../controllers/user.controllers";
import { uploadUserAvatar } from "../middleware/upload.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router: Router = Router();

router.post("/register", uploadUserAvatar, userController.register);
router.post("/login", userController.login);
router.get("/paginated", userController.getUsersPaginated);
router.post(
  "/update-role/:id",
  authMiddleware,
  roleMiddleware([1]),
  userController.updateUser,
);

export default router;
