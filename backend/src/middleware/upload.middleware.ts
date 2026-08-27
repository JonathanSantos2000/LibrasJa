import { createUpload } from "../configs/multer.config";

export const uploadFurnitureImage = createUpload("furniture").single("FurImg");

export const uploadUserAvatar = createUpload("users").single("avatar");

export const uploadWeddingPhoto = createUpload("wedding").single("photo");
