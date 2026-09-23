import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ToastService } from './toast.service';
import { Observable, tap } from 'rxjs';
import { Sinais } from '../shared/models/sinais.models';
import {
  GET_ALL_SINAIS_URL,
  SINAIS_REGISTER_URL,
} from '../shared/constants/urls';
import { SinaisPagination } from '../shared/interfaces/ISinaisPaginated';

@Service()
export class SinaisService {
  private readonly http = inject(HttpClient);
  private readonly toastr = inject(ToastService);

  CreateSinais(formData: FormData): Observable<Sinais> {
    return this.http.post<Sinais>(SINAIS_REGISTER_URL, formData).pipe(
      tap({
        next: (sinais) => {
          this.toastr.success(
            `Sinais: ${sinais.SinTit} registrada com sucesso`,
          );
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error, ' registro falhou');
        },
      }),
    );
  }

  GetAllSinais(page: number = 1): Observable<SinaisPagination> {
    return this.http.get<SinaisPagination>(
      `${GET_ALL_SINAIS_URL}?page=${page}&limit=10`,
    );
  }
}
