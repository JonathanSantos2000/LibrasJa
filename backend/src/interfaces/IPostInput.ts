import { Types } from "mongoose";

interface ICategorias {
  FurComId: Types.ObjectId;
  PostCatNon: string;
}
export interface IPostInput {
  PostTit: string;
  PostDes: string;
  PostAut: string;
  PostAutNom: string;
  PostLink: string;
  PostCats: ICategorias[];
}
