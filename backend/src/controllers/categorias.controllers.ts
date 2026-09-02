import type { Request, Response } from "express";
import * as categoriasService from "../services/categorias.services";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    const payload = {
      CatNom: req.body.CatNom,
      CatImg: file?.filename || "",
      CatDatCad: new Date(),
    };
    const categoria = await categoriasService.createCategoria(payload);
    res.status(201).json(categoria);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllCategorias = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const categorias = await categoriasService.getAllCategorias();
    res.status(200).json(categorias);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCategoriasPaginated = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
