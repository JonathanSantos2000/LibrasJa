import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Categorias } from '../shared/models/categorias.models';
import { ToastService } from '../services/toast.service';
import { Observable, tap } from 'rxjs';

import {
  CATEGORIAS_REGISTER_URL,
  GET_ALL_CATEGORIAS_PAGINATED_URL,
  GET_ALL_CATEGORIAS_URL,
} from '../shared/constants/urls';
import { CategoriasPaginated } from '../shared/interfaces/ICategoriasPaginated';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private readonly http = inject(HttpClient);
  private readonly toastr = inject(ToastService);

  CreateCategorias(formData: FormData): Observable<Categorias> {
    return this.http.post<Categorias>(CATEGORIAS_REGISTER_URL, formData).pipe(
      tap({
        next: (categoria) => {
          this.toastr.success(
            `Categoria ${categoria.CatNom} registrada com sucesso`,
          );
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error, 'registro falhou');
        },
      }),
    );
  }

  getAllCategorias(): Observable<Categorias[]> {
    return this.http.get<Categorias[]>(GET_ALL_CATEGORIAS_URL);
  }

  getCategoriasPaginated(page: number = 1): Observable<CategoriasPaginated> {
    return this.http.get<CategoriasPaginated>(
      `${GET_ALL_CATEGORIAS_PAGINATED_URL}?page=${page}&limit=10`,
    );
  }
}
