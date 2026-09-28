"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriasPaginated = exports.getAllCategorias = exports.register = void 0;
const categoriasService = __importStar(require("../services/categorias.services"));
const register = async (req, res) => {
    try {
        const file = req.file;
        const payload = {
            CatNom: req.body.CatNom,
            CatImg: file?.filename || "",
            CatDatCad: new Date(),
        };
        const categoria = await categoriasService.createCategoria(payload);
        res.status(201).json(categoria);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.register = register;
const getAllCategorias = async (req, res) => {
    try {
        const categorias = await categoriasService.getAllCategorias();
        res.status(200).json(categorias);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getAllCategorias = getAllCategorias;
const getCategoriasPaginated = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const categorias = await categoriasService.getCategoriasPaginated({
            skip,
            limit,
        });
        const total = await categoriasService.countCategorias();
        res.status(200).json({
            categorias,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getCategoriasPaginated = getCategoriasPaginated;
