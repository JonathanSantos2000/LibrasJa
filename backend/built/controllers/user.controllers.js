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
exports.getUserPhoto = exports.getUsersByRoles = exports.updateUser = exports.getUsersPaginated = exports.login = exports.register = void 0;
const cloudinary_services_1 = require("../services/cloudinary.services");
const userService = __importStar(require("../services/user.services"));
const register = async (req, res) => {
    try {
        const file = req.file;
        let UsuImgPer = "";
        if (file) {
            const result = await (0, cloudinary_services_1.uploadImage)(file.buffer, "librasja/users");
            UsuImgPer = result.secure_url;
        }
        const payload = {
            UsuNom: req.body.UsuNom,
            UsuEmail: req.body.UsuEmail,
            UsuSen: req.body.UsuSen,
            UsuImgPer: UsuImgPer,
        };
        const user = await userService.createUser(payload);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const user = await userService.loginUser(req.body);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};
exports.login = login;
const getUsersPaginated = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const users = await userService.getUsersPaginated({
            skip,
            limit,
        });
        const total = await userService.countUsers();
        res.status(200).json({
            users,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getUsersPaginated = getUsersPaginated;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (typeof id !== "string") {
            res.status(400).json({
                error: "ID do usuário inválido",
            });
            return;
        }
        const { UsuNivAce } = req.body;
        const user = await userService.updateUserRole(id, Number(UsuNivAce));
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
exports.updateUser = updateUser;
const getUsersByRoles = async (req, res) => {
    try {
        const rolesParam = req.query.roles;
        const roles = (Array.isArray(rolesParam) ? rolesParam : [rolesParam]).map(Number);
        if (roles.length === 0 ||
            roles.some((role) => !Number.isInteger(role) || ![0, 1, 2].includes(role))) {
            return res.status(400).json({
                message: "Lista de roles inválida.",
            });
        }
        const users = await userService.getUsersByRoles(roles);
        return res.status(200).json(users);
    }
    catch (error) {
        console.error("Erro ao buscar usuários por roles:", error);
        return res.status(500).json({
            message: "Erro ao buscar usuários.",
        });
    }
};
exports.getUsersByRoles = getUsersByRoles;
const getUserPhoto = async (req, res) => {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            res.status(400).json({ error: "ID do usuário inválido" });
            return;
        }
        const photoUrl = await userService.getUserPhoto(id);
        if (!photoUrl) {
            res.status(404).send("Foto não encontrada");
            return;
        }
        res.status(200).send(photoUrl);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getUserPhoto = getUserPhoto;
