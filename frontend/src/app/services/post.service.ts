import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { Observable, tap } from 'rxjs';
import { Post } from '../shared/models/post.models';

import { PostPagination } from '../shared/interfaces/IPostginated';
import {
  GET_ALL_POSTS_PAGINATED_URL,
  POST_ID_URL,
  POST_REGISTER_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly http = inject(HttpClient);
  private readonly toastr = inject(ToastService);

  CreatePost(formData: FormData): Observable<Post> {
    return this.http.post<Post>(POST_REGISTER_URL, formData).pipe(
      tap({
        next: (post) => {
          this.toastr.success(`Post: ${post.PostTit} registrado com sucesso`);
        },
        error: (errorResponse) => {
          this.toastr.error(
            errorResponse.error?.error || 'Registro falhou',
            'Erro',
          );
        },
      }),
    );
  }

  GetPostsPaginated(
    page: number = 1,
    filters: {
      q?: string;
      autor?: string;
      categoria?: string;
    } = {},
  ): Observable<PostPagination> {
    let params = new HttpParams().set('page', page).set('limit', 10);

    if (filters.q) {
      params = params.set('q', filters.q);
    }

    if (filters.autor) {
      params = params.set('autor', filters.autor);
    }

    if (filters.categoria) {
      params = params.set('categoria', filters.categoria);
    }

    return this.http.get<PostPagination>(GET_ALL_POSTS_PAGINATED_URL, {
      params,
    });
  }

  GetPostId(id: string): Observable<Post> {
    return this.http.get<Post>(`${POST_ID_URL.replace(':id', id)}`);
  }
}
