import { IPaginacaoInput } from "../interfaces/IPaginacaoInput";
import { IPostInput } from "../interfaces/IPostInput";
import Post, { IPost } from "../models/post.model";

export const createPost = async ({
  PostTit,
  PostDes,
  PostAut,
  PostAutNom,
  PostLink,
  PostCats,
}: IPostInput): Promise<IPost> => {
  const existingPost = await Post.findOne({ PostTit });

  if (existingPost) throw new Error("Post already exists");

  const post = new Post({
    PostTit,
    PostDes,
    PostAut,
    PostAutNom,
    PostLink,
    PostCats,
  });
  return await post.save();
};

export const getPostsPaginated = async ({
  skip,
  limit,
}: IPaginacaoInput): Promise<IPost[]> => {
  return Post.find().sort({ PostTit: 1 }).skip(skip).limit(limit);
};

export const countPosts = async () => {
  return Post.countDocuments();
};

export const getPostId = async (id: string): Promise<IPost | null> => {
  const post = await Post.findById(id);
  return post;
};
