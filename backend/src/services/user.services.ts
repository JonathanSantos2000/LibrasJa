import bcrypt from "bcryptjs";
import { generateToken } from "../utils/user.utils";
import User, { IUser } from "../models/user.model";
import type { IUserResponse } from "../interfaces/IUserResponse";
import type { IUserInput } from "../interfaces/IUserInput";

export const createUser = async ({
  UsuNom,
  UsuEmail,
  UsuSen,
  UsuImgPer,
}: {
  UsuNom: string;
  UsuEmail: string;
  UsuSen: string;
  UsuImgPer: string;
}): Promise<IUserInput> => {
  const existingUser = await User.findOne({ UsuEmail });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(UsuSen, 10);
  const user = new User({
    UsuNom,
    UsuEmail,
    UsuSen: hashedPassword,
    UsuImgPer,
  });
  const savedUser = await user.save();

  // Gera o token usando o usuário criado
  const token = generateToken(savedUser);

  // Remove a senha da resposta
  const { UsuSen: _, ...userSafe } = savedUser.toObject();

  return {
    ...userSafe,
    id: savedUser._id.toString(),
    UsuTok: token,
  };
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
