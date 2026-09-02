import { Schema, model, Document } from "mongoose";

export interface ICategoria extends Document {
  CatNom: string;
  CatImg: string;
  CatDatCad: Date;
  CatQtdCon: number;
}

const CategoriaSchema = new Schema<ICategoria>(
  {
    CatNom: {
      type: String,
      required: true,
    },
    CatImg: {
      type: String,
      required: true,
    },
    CatDatCad: {
      type: Date,
      required: true,
    },
    CatQtdCon: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<ICategoria>("Categoria", CategoriaSchema);
