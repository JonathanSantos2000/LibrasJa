"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadUserAvatar = exports.uploadCategoriasImage = void 0;
const multer_config_1 = require("../configs/multer.config");
exports.uploadCategoriasImage = (0, multer_config_1.createUpload)("categorias").single("CatImg");
exports.uploadUserAvatar = (0, multer_config_1.createUpload)("users").single("UsuImgPer");
