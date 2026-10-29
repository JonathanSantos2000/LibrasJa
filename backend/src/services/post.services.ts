import { IPaginacaoInputFilters } from "../interfaces/IPaginacaoInput";
import { PostFilters } from "../interfaces/IPostFilters";
import { IPostInput } from "../interfaces/IPostInput";
import Post, { IPost } from "../models/post.model";

const escapeRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalizeText = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const buildPostFilter = (filters: PostFilters = {}) => {
  const query: Record<string, any> = {};

  // Pesquisa pelo título, ignorando acentuação
  if (filters.q?.trim()) {
    const search = new RegExp(escapeRegex(normalizeText(filters.q)), "i");

    query.PostTitNorm = search;
  }

  // Pesquisa pelo nome do autor
  if (filters.autor?.trim()) {
    query.PostAutNom = new RegExp(escapeRegex(filters.autor.trim()), "i");
  }

  // Pesquisa pela categoria
  if (filters.categoria?.trim()) {
    query["PostCats.PostCatNom"] = new RegExp(
      escapeRegex(filters.categoria.trim()),
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

  if (existingPost) {
    throw new Error("Post already exists");
  }

  const post = new Post({
    PostTit,
    PostTitNorm: normalizeText(PostTit),
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
  return Post.findById(id);
};
