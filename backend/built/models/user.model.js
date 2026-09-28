"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    UsuNom: {
        type: String,
        required: true,
    },
    UsuEmail: {
        type: String,
        required: true,
        unique: true,
    },
    UsuSen: {
        type: String,
        required: true,
    },
    UsuNivAce: {
        type: Number,
        enum: [0, 1, 2],
        default: 0,
    },
    UsuAti: {
        type: Boolean,
        default: true,
    },
    UsuImgPer: {
        type: String,
        default: "",
    },
    UsuQtdPost: {
        type: Number,
        default: 0,
    },
    UsuDatCad: { type: Date, default: Date.now },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
