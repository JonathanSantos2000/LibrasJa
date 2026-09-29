import { Document, model, Schema, Types } from "mongoose";

interface ICategorias {
  PostCatId: Types.ObjectId;
  PostCatNom: string;
}

export interface IPost extends Document {
  PostTit: string;
  PostDes: string;
  PostAut: string;
  PostAutNom: string;
  PostLink: string;
  PostCats: ICategorias[];
  PostDatCad: Date;
  PostImg: string;
}

const PostSchema = new Schema<IPost>(
  {
    PostTit: {
      type: String,
      required: true,
    },
    PostDes: {
      type: String,
      required: true,
    },
    PostAut: {
      type: String,
      required: true,
    },
    PostAutNom: {
      type: String,
      required: true,
    },
    PostLink: {
      type: String,
      required: true,
    },
    PostCats: [
      {
        PostCatId: {
          type: String,
          required: true,
        },
        PostCatNom: {
          type: String,
          required: true,
        },
      },
    ],
    PostImg: {
      type: String,
      default: "",
    },
    PostDatCad: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export default model<IPost>("Post", PostSchema);
