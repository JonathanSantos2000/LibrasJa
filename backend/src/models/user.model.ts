import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  UsuNom: string;
  UsuEmail: string;
  UsuSen: string;
  UsuNivAce: number;
  UsuAti: boolean;
  UsuImgPer: string;
  UsuDatCad: Date;
}

const UserSchema = new Schema<IUser>(
  {
    UsuNom: {
      type: String,
      required: true,
    },

    UsuEmail: {
      type: String,
      required: true,
      unique: true,
    },

    UsuSen: {
      type: String,
      required: true,
    },

    UsuNivAce: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },

    UsuAti: {
      type: Boolean,
      default: true,
    },
    UsuImgPer: {
      type: String,
      default: "",
    },
    UsuDatCad: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export default model<IUser>("User", UserSchema);
