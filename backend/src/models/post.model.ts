import { Document, model, Schema, Types } from "mongoose";

interface ICategorias {
  FurComId: Types.ObjectId;
  PostCatNon: string;
}
export interface IPost extends Document {
  PostTit: string;
  PostDes: string;
  PostAut: string;
  PostAutNom: string;
  PostLink: string;
  PostCats: ICategorias[];
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
        PostCatNon: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default model<IPost>("Post", PostSchema);
