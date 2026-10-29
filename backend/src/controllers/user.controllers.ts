import { Request, Response } from "express";
import { uploadImage } from "../services/cloudinary.services";
import * as userService from "../services/user.services";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    let UsuImgPer = "";

    if (file) {
      const result = await uploadImage(file.buffer, "librasja/users");
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
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.loginUser(req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const getUsersPaginated = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getUsersByRoles = async (req: Request, res: Response) => {
  try {
    const rolesParam = req.query.roles;

    const roles = (Array.isArray(rolesParam) ? rolesParam : [rolesParam]).map(
      Number,
    );

    if (
      roles.length === 0 ||
      roles.some((role) => !Number.isInteger(role) || ![0, 1, 2].includes(role))
    ) {
      return res.status(400).json({
        message: "Lista de roles inválida.",
      });
    }

    const users = await userService.getUsersByRoles(roles);

    return res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários por roles:", error);

    return res.status(500).json({
      message: "Erro ao buscar usuários.",
    });
  }
};
