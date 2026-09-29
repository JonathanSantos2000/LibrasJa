import type { Request, Response } from "express";
import * as postService from "../services/post.services";
import * as userService from "../services/user.services";
import * as categoriasService from "../services/categorias.services";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { PostTit, PostDes, PostAut, PostAutNom, PostLink, PostCats } =
      req.body;

    const file = req.file;

    const PostImg = file ? file.filename : "";

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

    console.log("CATEGORIAS RECEBIDAS:", PostCats);
    console.log("CATEGORIAS PARSED:", categorias);

    for (const categoria of categorias) {
      console.log("INCREMENTANDO CATEGORIA:", categoria.PostCatId);

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
