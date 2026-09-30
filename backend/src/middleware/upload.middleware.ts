import { createUpload } from "../configs/multer.config";

export const uploadCategoriasImage = createUpload().single("CatImg");

export const uploadUserAvatar = createUpload().single("UsuImgPer");

export const uploadPostImage = createUpload().single("PostImg");
