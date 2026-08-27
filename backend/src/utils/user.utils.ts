import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";

export const generateToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id, role: user.UsuCar },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};
