import { Component } from '@angular/core';
import { User } from '../../../shared/models/user.models';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', './menu.header.component.css'],
})
export class MenuComponent {
  menu_level: 'off' | 'menu' = 'off';
  menu_center: 'normal' | 'admin' | 'sinais' | 'categorias' = 'normal';

  user!: User;
  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.userService.user$.subscribe((newUser) => {
      this.user = newUser!;
    });
  }

  // =========================
  // GETTERS
  // =========================

  get isAuth(): boolean {
    return !!this.user?.UsuTok;
  }

  get isAdmin(): boolean {
    return this.user?.UsuNivAce === 1;
  }

  get firstName(): string {
    return this.user?.UsuNom?.split(' ')[0] || '';
  }

  // =========================
  // MENU ACTIONS
  // =========================
  open_menu() {
    this.menu_level = 'menu';
  }

  close_menu() {
    this.menu_level = 'off';
    this.menu_center = 'normal';
  }

  back_menu() {
    if (this.menu_center === 'normal') {
      this.menu_level = 'off';
    } else if (this.menu_center === 'admin') {
      this.menu_center = 'normal';
    } else if (this.menu_center === 'sinais') {
      this.menu_center = 'admin';
    } else if (this.menu_center === 'categorias') {
      this.menu_center = 'admin';
    }
  }

  menuAdm() {
    this.menu_center = 'admin';
  }
  menuSinal() {
    this.menu_center = 'sinais';
  }
  menuCategorias() {
    this.menu_center = 'categorias';
  }
  logout() {
    this.userService.logout();
    this.close_menu();
  }
}
