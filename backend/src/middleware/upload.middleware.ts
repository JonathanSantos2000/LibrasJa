import { createUpload } from "../configs/multer.config";

export const uploadFurnitureImage = createUpload("furniture").single("FurImg");

export const uploadUserAvatar = createUpload("users").single("UsuImgPer");

export const uploadWeddingPhoto = createUpload("wedding").single("photo");
