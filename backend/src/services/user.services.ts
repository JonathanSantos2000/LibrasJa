import bcrypt from "bcryptjs";
import { generateToken } from "../utils/user.utils";
import User, { IUser } from "../models/user.model";
import type { IUserResponse } from "../interfaces/IUserResponse";

interface IUserInput {
  UsuNom: string;
  UsuEmail: string;
  UsuSen: string;
  UsuTok: string;
}

export const createUser = async ({
  UsuNom,
  UsuEmail,
  UsuSen,
}: IUserInput): Promise<IUser> => {
  const existingUser = await User.findOne({ UsuEmail });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(UsuSen, 10);
  const user = new User({ UsuNom, UsuEmail, UsuSen: hashedPassword });
  return await user.save();
};

export const loginUser = async ({
  UsuEmail,
  UsuSen,
}: {
  UsuEmail: string;
  UsuSen: string;
}): Promise<IUserResponse> => {
  const user = await User.findOne({ UsuEmail });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(UsuSen, user.UsuSen);
  if (!isMatch) throw new Error("Invalid credentials");
  const token = generateToken(user);
  const userObj = user.toObject();
  // 🔥 remove senha corretamente
  const { UsuSen: _, ...userSafe } = user.toObject();

  return {
    ...userSafe,
    id: user._id.toString(),
    UsuTok: token,
  };
};
