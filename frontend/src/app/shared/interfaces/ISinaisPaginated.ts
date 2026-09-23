import { Sinais } from '../models/sinais.models';

export interface SinaisPagination {
  sinais: Sinais[];
  total: number;
  page: number;
  totalPages: number;
}
