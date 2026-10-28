import type { Request, Response } from "express";
import * as postService from "../services/post.services";
import * as userService from "../services/user.services";
import * as categoriasService from "../services/categorias.services";
import { uploadImage } from "../services/cloudinary.services";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { PostTit, PostDes, PostAut, PostAutNom, PostLink, PostCats } =
      req.body;

    const file = req.file;
    let PostImg = "";

    if (file) {
      const result = await uploadImage(file.buffer, "librasja/post");
      PostImg = result.secure_url;
    }

    const post = await postService.createPost({
      PostTit,
      PostDes,
      PostAut,
      PostAutNom,
      PostLink,
      PostCats: JSON.parse(PostCats),
      PostImg,
    });

    await userService.addQtdPost(PostAut);

    const categorias = JSON.parse(PostCats);

    for (const categoria of categorias) {
      await categoriasService.addQtdPost(categoria.PostCatId);
    }

    res.status(201).json(post);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getPostsPaginated = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);

    const filters = {
      q: typeof req.query.q === "string" ? req.query.q.trim() : "",
      autor: typeof req.query.autor === "string" ? req.query.autor.trim() : "",
      categoria:
        typeof req.query.categoria === "string"
          ? req.query.categoria.trim()
          : "",
    };

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      postService.getPostsPaginated({
        skip,
        limit,
        filters,
      }),
      postService.countPosts(filters),
    ]);

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
