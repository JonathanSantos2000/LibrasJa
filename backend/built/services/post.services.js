"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostId = exports.countPosts = exports.getPostsPaginated = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const normalizeText = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
const buildPostFilter = (filters = {}) => {
    const query = {};
    // Pesquisa pelo título, ignorando acentuação
    if (filters.q?.trim()) {
        const search = new RegExp(escapeRegex(normalizeText(filters.q)), "i");
        query.PostTitNorm = search;
    }
    // Pesquisa pelo nome do autor
    if (filters.autor?.trim()) {
        query.PostAutNom = new RegExp(escapeRegex(filters.autor.trim()), "i");
    }
    // Pesquisa pela categoria
    if (filters.categoria?.trim()) {
        query["PostCats.PostCatNom"] = new RegExp(escapeRegex(filters.categoria.trim()), "i");
    }
    return query;
};
const createPost = async ({ PostTit, PostDes, PostAut, PostAutNom, PostLink, PostCats, PostImg, }) => {
    const existingPost = await post_model_1.default.findOne({ PostTit });
    if (existingPost) {
        throw new Error("Post already exists");
    }
    const post = new post_model_1.default({
        PostTit,
        PostTitNorm: normalizeText(PostTit),
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
    return post_model_1.default.findById(id);
};
exports.getPostId = getPostId;
