import { Categorias } from '../models/categorias.models';

export interface CategoriasPaginated {
  categorias: Categorias[];
  total: number;
  page: number;
  totalPages: number;
}
