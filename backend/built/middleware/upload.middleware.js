"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPostImage = exports.uploadUserAvatar = exports.uploadCategoriasImage = void 0;
const multer_config_1 = require("../configs/multer.config");
exports.uploadCategoriasImage = (0, multer_config_1.createUpload)().single("CatImg");
exports.uploadUserAvatar = (0, multer_config_1.createUpload)().single("UsuImgPer");
exports.uploadPostImage = (0, multer_config_1.createUpload)().single("PostImg");
