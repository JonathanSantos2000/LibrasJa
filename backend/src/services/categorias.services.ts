import { ICategoriaInput } from "../interfaces/ICategoriaInput";
import { IPaginacaoInput } from "../interfaces/IPaginacaoInput";
import Categoria, { ICategoria } from "../models/categoria.model";

export const createCategoria = async ({
  CatNom,
  CatImg,
  CatDatCad,
}: ICategoriaInput): Promise<ICategoria> => {
  const existingCategoria = await Categoria.findOne({ CatNom });

  if (existingCategoria) throw new Error("Categoria already exists");

  const categoria = new Categoria({
    CatNom,
    CatImg,
    CatDatCad,
    CatQtdCon: 0,
  });
  return await categoria.save();
};

export const getAllCategorias = async (): Promise<ICategoria[]> => {
  return await Categoria.find();
};

export const getCategoriasPaginated = async ({
  skip,
  limit,
}: IPaginacaoInput): Promise<ICategoria[]> => {
  return Categoria.find().sort({ CatNom: 1 }).skip(skip).limit(limit);
};

export const countCategorias = async () => {
  return Categoria.countDocuments();
};
