"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostId = exports.countPosts = exports.getPostsPaginated = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const buildPostFilter = (filters = {}) => {
    const query = {};
    // Pesquisa pelo título ou descrição
    if (filters.q) {
        const search = new RegExp(escapeRegex(filters.q), "i");
        query.$or = [{ PostTit: search }, { PostDes: search }];
    }
    // Pesquisa pelo nome do autor
    if (filters.autor) {
        query.PostAutNom = new RegExp(escapeRegex(filters.autor), "i");
    }
    // Pesquisa em qualquer categoria associada ao post
    if (filters.categoria) {
        query["PostCats.PostCatNom"] = new RegExp(escapeRegex(filters.categoria), "i");
    }
    return query;
};
const createPost = async ({ PostTit, PostDes, PostAut, PostAutNom, PostLink, PostCats, PostImg, }) => {
    const existingPost = await post_model_1.default.findOne({ PostTit });
    if (existingPost)
        throw new Error("Post already exists");
    const post = new post_model_1.default({
        PostTit,
        PostDes,
        PostAut,
        PostAutNom,
        PostLink,
        PostCats,
        PostImg,
    });
    return await post.save();
};
exports.createPost = createPost;
const getPostsPaginated = async ({ skip, limit, filters = {}, }) => {
    return post_model_1.default.find(buildPostFilter(filters))
        .sort({ PostTit: 1 })
        .skip(skip)
        .limit(limit);
};
exports.getPostsPaginated = getPostsPaginated;
const countPosts = async (filters = {}) => {
    return post_model_1.default.countDocuments(buildPostFilter(filters));
};
exports.countPosts = countPosts;
const getPostId = async (id) => {
    const post = await post_model_1.default.findById(id);
    return post;
};
exports.getPostId = getPostId;
