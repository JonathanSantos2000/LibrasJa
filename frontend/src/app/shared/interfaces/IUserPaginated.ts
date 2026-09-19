import { User } from '../models/user.models';

export interface UserPaginated {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
}
