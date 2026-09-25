import type { Request, Response } from "express";
import * as postService from "../services/post.services";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
