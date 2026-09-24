import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { User } from '../../../shared/models/user.models';
import { UserService } from '../../../services/user.service';

type MenuLevel = 'off' | 'menu';

type MenuCenter = 'normal' | 'admin' | 'posts' | 'categorias' | 'config';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      this.isAuth = !!user;

      if (user?.UsuNom) {
        this.firstName = user.UsuNom.trim().split(/\s+/)[0];
      } else {
        this.firstName = '';
      }

      /*
       * Se o usuário não estiver autenticado,
       * garante que o menu normal seja exibido.
       */
      if (!this.isAuth) {
        this.menu_center = 'normal';
      }
    });
  }

  /**
   * Abre o menu lateral.
   *
   * Sempre começa no menu principal.
   */
  open_menu(): void {
    this.menu_center = this.getInitialMenu();

    this.menu_level = 'menu';
  }

  /**
   * Fecha o menu lateral.
   */
  close_menu(): void {
    this.menu_level = 'off';

    /*
     * Reseta o submenu.
     * Assim, quando abrir novamente,
     * não ficará preso no último submenu.
     */
    this.menu_center = this.getInitialMenu();
  }

  /**
   * Volta para o menu principal.
   *
   * Não fecha o menu lateral.
   */
  back_menu(): void {
    this.menu_center = this.getInitialMenu();
  }

  /**
   * Define o menu inicial de acordo
   * com o nível de acesso do usuário.
   */
  private getInitialMenu(): 'normal' | 'admin' {
    if (this.isAuth && this.user && this.user.UsuNivAce > 0) {
      return 'admin';
    }

    return 'normal';
  }

  /**
   * Abre o menu de Posts.
   */
  menuPosts(): void {
    this.menu_center = 'posts';
  }

  /**
   * Abre o menu de categorias.
   */
  menuCategorias(): void {
    this.menu_center = 'categorias';
  }

  /**
   * Abre o menu de configurações.
   */
  menuConfigUser(): void {
    this.menu_center = 'config';
  }

  /**
   * Realiza logout.
   */
  logout(): void {
    this.userService.logout();

    this.user = null;
    this.isAuth = false;
    this.firstName = '';

    this.menu_center = 'normal';
    this.menu_level = 'off';
  }
}
