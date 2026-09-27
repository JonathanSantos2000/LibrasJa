import { Types } from "mongoose";

interface ICategorias {
  FurComId: Types.ObjectId;
  PostCatNom: string;
}
export interface IPostInput {
  PostTit: string;
  PostDes: string;
  PostAut: string;
  PostAutNom: string;
  PostLink: string;
  PostCats: ICategorias[];
}
