import { Post } from '../models/post.models';

export interface PostPagination {
  posts: Post[];
  total: number;
  page: number;
  totalPages: number;
}
