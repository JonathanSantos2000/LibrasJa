import { createUpload } from "../configs/multer.config";

export const uploadCategoriasImage =
  createUpload("categorias").single("CatImg");

export const uploadUserAvatar = createUpload("users").single("UsuImgPer");

