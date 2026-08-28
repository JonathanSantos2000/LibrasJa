import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userJson = localStorage.getItem('User');

  let token: string | null = null;

  if (userJson) {
    const user = JSON.parse(userJson);
    token = user?.UsuTok; // 👈 AJUSTE AQUI (nome exato do campo)
  }
  
  const router = inject(Router);

  let cloned = req;

  if (token) {
    cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(cloned).pipe(
    catchError((error) => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        router.navigate(['auth/login']);
      }

      return throwError(() => error);
    })
  );
};
