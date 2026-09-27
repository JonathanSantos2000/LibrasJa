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

router.get("/paginated", postController.getPostsPaginated);

router.get("/id/:id", postController.getPostId);
export default router;
