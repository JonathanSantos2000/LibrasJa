import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { uploadCategoriasImage } from "../middleware/upload.middleware";
import * as categoriasController from "../controllers/categorias.controllers";
const router: Router = Router();
console.log("categorias.router.ts carregado");

router.post(
  "/register",
  authMiddleware,
  roleMiddleware([1]),
  uploadCategoriasImage,
  categoriasController.register,
);

router.get("/", categoriasController.getAllCategorias);
router.get("/paginated", categoriasController.getCategoriasPaginated);

export default router;
