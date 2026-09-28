"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    PostTit: {
        type: String,
        required: true,
    },
    PostDes: {
        type: String,
        required: true,
    },
    PostAut: {
        type: String,
        required: true,
    },
    PostAutNom: {
        type: String,
        required: true,
    },
    PostLink: {
        type: String,
        required: true,
    },
    PostCats: [
        {
            PostCatId: {
                type: String,
                required: true,
            },
            PostCatNom: {
                type: String,
                required: true,
            },
        },
    ],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Post", PostSchema);
