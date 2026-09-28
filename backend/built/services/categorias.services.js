"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countCategorias = exports.getCategoriasPaginated = exports.getAllCategorias = exports.createCategoria = void 0;
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
const createCategoria = async ({ CatNom, CatImg, CatDatCad, }) => {
    const existingCategoria = await categoria_model_1.default.findOne({ CatNom });
    if (existingCategoria)
        throw new Error("Categoria already exists");
    const categoria = new categoria_model_1.default({
        CatNom,
        CatImg,
        CatDatCad,
        CatQtdCon: 0,
    });
    return await categoria.save();
};
exports.createCategoria = createCategoria;
const getAllCategorias = async () => {
    return await categoria_model_1.default.find();
};
exports.getAllCategorias = getAllCategorias;
const getCategoriasPaginated = async ({ skip, limit, }) => {
    return categoria_model_1.default.find().sort({ CatNom: 1 }).skip(skip).limit(limit);
};
exports.getCategoriasPaginated = getCategoriasPaginated;
const countCategorias = async () => {
    return categoria_model_1.default.countDocuments();
};
exports.countCategorias = countCategorias;
