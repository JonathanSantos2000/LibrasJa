"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQtdPost = exports.updateUserRole = exports.countUsers = exports.getUsersPaginated = exports.loginUser = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_utils_1 = require("../utils/user.utils");
const user_model_1 = __importDefault(require("../models/user.model"));
const createUser = async ({ UsuNom, UsuEmail, UsuSen, UsuImgPer, }) => {
    const existingUser = await user_model_1.default.findOne({ UsuEmail });
    if (existingUser)
        throw new Error("User already exists");
    const hashedPassword = await bcryptjs_1.default.hash(UsuSen, 10);
    const user = new user_model_1.default({
        UsuNom,
        UsuEmail,
        UsuSen: hashedPassword,
        UsuImgPer,
        UsuQtdPost: 0,
    });
    const savedUser = await user.save();
    // Gera o token usando o usuário criado
    const token = (0, user_utils_1.generateToken)(savedUser);
    // Remove a senha da resposta
    const { UsuSen: _, ...userSafe } = savedUser.toObject();
    return {
        ...userSafe,
        id: savedUser._id.toString(),
        UsuTok: token,
    };
};
exports.createUser = createUser;
const loginUser = async ({ UsuEmail, UsuSen, }) => {
    const user = await user_model_1.default.findOne({ UsuEmail });
    if (!user)
        throw new Error("Invalid credentials");
    const isMatch = await bcryptjs_1.default.compare(UsuSen, user.UsuSen);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = (0, user_utils_1.generateToken)(user);
    const userObj = user.toObject();
    // 🔥 remove senha corretamente
    const { UsuSen: _, ...userSafe } = user.toObject();
    return {
        ...userSafe,
        id: user._id.toString(),
        UsuTok: token,
    };
};
exports.loginUser = loginUser;
const getUsersPaginated = async ({ skip, limit, }) => {
    return user_model_1.default.find().sort({ UsuNom: 1 }).skip(skip).limit(limit);
};
exports.getUsersPaginated = getUsersPaginated;
const countUsers = async () => {
    return user_model_1.default.countDocuments();
};
exports.countUsers = countUsers;
const updateUserRole = async (userId, UsuNivAce) => {
    if (![0, 1, 2].includes(UsuNivAce)) {
        throw new Error("Nível de acesso inválido");
    }
    const user = await user_model_1.default.findByIdAndUpdate(userId, {
        $set: {
            UsuNivAce,
        },
    }, {
        returnDocument: "after",
        runValidators: true,
    }).select("-UsuSen");
    if (!user) {
        throw new Error("Usuário não encontrado");
    }
    return user;
};
exports.updateUserRole = updateUserRole;
const addQtdPost = async (userId) => {
    const user = await user_model_1.default.findByIdAndUpdate(userId, {
        $inc: {
            UsuQtdPost: 1,
        },
    }, {
        returnDocument: "after",
    }).select("-UsuSen");
    if (!user) {
        throw new Error("Usuário não encontrado");
    }
    return user;
};
exports.addQtdPost = addQtdPost;
