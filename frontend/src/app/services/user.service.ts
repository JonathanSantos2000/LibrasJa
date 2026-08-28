import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, tap, Observable } from 'rxjs';
import { User } from '../shared/models/user.models';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { isPlatformBrowser } from '@angular/common';
import { ToastService } from '../services/toast.service';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
private readonly toastr = inject(ToastService);

  private readonly userSubject = new BehaviorSubject<User | null>(null);
  public readonly user$ = this.userSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadUserFromStorage();
  }

  // ========================
  // AUTH METHODS
  // ========================

  login(credentials: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, credentials).pipe(
      tap({
        next: (user) => this.handleAuthSuccess(user, 'Login bem-sucedido'),
        error: (err) => this.handleError(err, 'Falha ao logar'),
      })
    );
  }

  register(data: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, data).pipe(
      tap({
        next: (user) => this.handleAuthSuccess(user, 'Registro bem-sucedido'),
        error: (err) => this.handleError(err, 'Registro falhou'),
      })
    );
  }

  logout(): void {
    this.userSubject.next(null);

    if (this.isBrowser()) {
      localStorage.removeItem(USER_KEY);
      window.location.reload();
    }
  }

  // ========================
  // PRIVATE HELPERS
  // ========================

  private handleAuthSuccess(user: User, message: string): void {
    this.setUserToStorage(user);
    this.userSubject.next(user);
    this.toastr.success(`Bem-vindo ao Kora, ${user.UsuNom}`, message);
  }

  private handleError(error: any, title: string): void {
    const message = error?.error || 'Ocorreu um erro inesperado';
    this.toastr.error(message, title);
  }

  private loadUserFromStorage(): void {
    if (!this.isBrowser()) return;

    const user = this.getUserFromStorage();
    if (user) {
      this.userSubject.next(user);
    }
  }

  private setUserToStorage(user: User): void {
    if (!this.isBrowser()) return;

    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromStorage(): User | null {
    if (!this.isBrowser()) return null;

    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? (JSON.parse(userJson) as User) : null;
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
