export interface IPaginacaoInput {
  skip: number;
  limit: number;
}

export interface IPaginacaoInputFilters {
  skip: number;
  limit: number;
  filters?: {
    q?: string;
    autor?: string;
    categoria?: string;
  };
}
