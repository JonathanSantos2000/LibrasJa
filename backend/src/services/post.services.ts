import {
  IPaginacaoInput,
  IPaginacaoInputFilters,
} from "../interfaces/IPaginacaoInput";
import { PostFilters } from "../interfaces/IPostFilters";
import { IPostInput } from "../interfaces/IPostInput";
import Post, { IPost } from "../models/post.model";

const escapeRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildPostFilter = (filters: PostFilters = {}) => {
  const query: Record<string, any> = {};

  // Pesquisa pelo título ou descrição
  if (filters.q) {
    const search = new RegExp(escapeRegex(filters.q), "i");

    query.$or = [{ PostTit: search }, { PostDes: search }];
  }

  // Pesquisa pelo nome do autor
  if (filters.autor) {
    query.PostAutNom = new RegExp(escapeRegex(filters.autor), "i");
  }

  // Pesquisa em qualquer categoria associada ao post
  if (filters.categoria) {
    query["PostCats.PostCatNom"] = new RegExp(
      escapeRegex(filters.categoria),
      "i",
    );
  }

  return query;
};

export const createPost = async ({
  PostTit,
  PostDes,
  PostAut,
  PostAutNom,
  PostLink,
  PostCats,
  PostImg,
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
    PostImg,
  });
  return await post.save();
};

export const getPostsPaginated = async ({
  skip,
  limit,
  filters = {},
}: IPaginacaoInputFilters & {
  filters?: PostFilters;
}): Promise<IPost[]> => {
  return Post.find(buildPostFilter(filters))
    .sort({ PostTit: 1 })
    .skip(skip)
    .limit(limit);
};

export const countPosts = async (
  filters: PostFilters = {},
): Promise<number> => {
  return Post.countDocuments(buildPostFilter(filters));
};

export const getPostId = async (id: string): Promise<IPost | null> => {
  const post = await Post.findById(id);
  return post;
};
