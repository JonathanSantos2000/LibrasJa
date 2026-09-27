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

export const getPostsPaginated = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const posts = await postService.getPostsPaginated({
      skip,
      limit,
    });

    const total = await postService.countPosts();

    res.status(200).json({
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getPostId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      res.status(400).json({ error: "Invalid post id" });
      return;
    }

    const post = await postService.getPostId(id);
    res.status(200).json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
