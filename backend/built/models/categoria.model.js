"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategoriaSchema = new mongoose_1.Schema({
    CatNom: {
        type: String,
        required: true,
    },
    CatImg: {
        type: String,
        required: true,
    },
    CatDatCad: {
        type: Date,
        required: true,
    },
    CatQtdCon: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Categoria", CategoriaSchema);
