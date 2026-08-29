import { Router } from "express";
import * as userController from "../controllers/user.controllers";
import { uploadUserAvatar } from "../middleware/upload.middleware";

const router: Router = Router();

router.post("/register", uploadUserAvatar, userController.register);
router.post("/login", userController.login);

export default router;
