import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ToastService } from './toast.service';
import { Observable, tap } from 'rxjs';
import { Post } from '../shared/models/post.models';

import { PostPagination } from '../shared/interfaces/IPostginated';
import {
  GET_ALL_POSTS_PAGINATED_URL,
  GET_ALL_POSTS_URL,
  POST_REGISTER_URL,
} from '../shared/constants/urls';

@Service()
export class PostsService {
  private readonly http = inject(HttpClient);
  private readonly toastr = inject(ToastService);

  CreatePost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(POST_REGISTER_URL, post).pipe(
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

  GetPostsPaginated(page: number = 1): Observable<PostPagination> {
    return this.http.get<PostPagination>(
      `${GET_ALL_POSTS_PAGINATED_URL}?page=${page}&limit=10`,
    );
  }
}
