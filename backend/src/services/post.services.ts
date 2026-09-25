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
