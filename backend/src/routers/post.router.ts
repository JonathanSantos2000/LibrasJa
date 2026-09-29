import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import * as postController from "../controllers/post.controllers";
import { uploadPostImage } from "../middleware/upload.middleware";

const router: Router = Router();

router.post(
  "/register",
  authMiddleware,
  roleMiddleware([1, 2]),
  uploadPostImage,
  postController.register,
);

router.get("/paginated", postController.getPostsPaginated);

router.get("/id/:id", postController.getPostId);
export default router;
