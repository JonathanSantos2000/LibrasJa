import { Types } from "mongoose";

interface ICategorias {
  PostCatId: Types.ObjectId;
  PostCatNom: string;
}
export interface IPostInput {
  PostTit: string;
  PostDes: string;
  PostAut: string;
  PostAutNom: string;
  PostLink: string;
  PostCats: ICategorias[];
  PostImg: string;
}
