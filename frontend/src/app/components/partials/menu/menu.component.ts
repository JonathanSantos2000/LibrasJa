import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { User } from '../../../shared/models/user.models';
import { UserService } from '../../../services/user.service';
import { UPLOAD_IMAGE_URL } from '../../../shared/constants/urls';
import { FormsModule } from '@angular/forms';

type MenuLevel = 'off' | 'menu';

type MenuCenter = 'normal' | 'admin' | 'posts' | 'categorias' | 'config';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  // Controle do menu lateral
  menu_level: MenuLevel = 'off';

  // Controle do conteúdo exibido
  menu_center: MenuCenter = 'normal';

  // Usuário atual
  user: User | null = null;

  // Usuário autenticado
  isAuth = false;

  // Primeiro nome
  firstName = '';

  searchTerm = '';

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  searchPosts(): void {
    const term = this.searchTerm.trim();

    if (!term) {
      return;
    }

    this.close_menu();

    this.router.navigate(['/posts/posts-list'], {
      queryParams: { q: term },
    });
  }
  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      this.isAuth = !!user;

      if (user?.UsuNom) {
        this.firstName = user.UsuNom.trim().split(/\s+/)[0];
      } else {
        this.firstName = '';
      }

      if (!this.isAuth) {
        this.menu_center = 'normal';
      }
    });
  }

  open_menu(): void {
    this.menu_center = this.getInitialMenu();

    this.menu_level = 'menu';
  }

  close_menu(): void {
    this.menu_level = 'off';

    this.menu_center = this.getInitialMenu();
  }

  back_menu(): void {
    this.menu_center = this.getInitialMenu();
  }

  private getInitialMenu(): 'normal' | 'admin' {
    if (this.isAuth && this.user && this.user.UsuNivAce > 0) {
      return 'admin';
    }

    return 'normal';
  }

  menuPosts(): void {
    this.menu_center = 'posts';
  }

  menuCategorias(): void {
    this.menu_center = 'categorias';
  }

  menuConfigUser(): void {
    this.menu_center = 'config';
  }

  logout(): void {
    this.userService.logout();

    this.user = null;
    this.isAuth = false;
    this.firstName = '';

    this.menu_center = 'normal';
    this.menu_level = 'off';
  }
}
