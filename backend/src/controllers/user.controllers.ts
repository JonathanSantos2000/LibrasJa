import { Request, Response } from "express";
import * as userService from "../services/user.services";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    const payload = {
      UsuNom: req.body.UsuNom,
      UsuEmail: req.body.UsuEmail,
      UsuSen: req.body.UsuSen,
      UsuImgPer: file?.filename || "",
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
