import { Routes } from '@angular/router';
import { RegisterPageComponent } from './components/pages/auth/register-page/register-page.component';
import { LoginPageComponent } from './components/pages/auth/login-page/login-page.component';
import { CategoriasNewComponent } from './components/pages/categorias-pages/categorias-new/categorias-new.component';
import { CategoriasEditComponent } from './components/pages/categorias-pages/categorias-edit/categorias-edit.component';
import { CategoriasListComponent } from './components/pages/categorias-pages/categorias-list/categorias-list.component';

export const routes: Routes = [
  /* { path: '', component: HomeComponent }, */

  { path: 'auth/registro', component: RegisterPageComponent },
  { path: 'auth/login', component: LoginPageComponent },
  /**/
  { path: 'categorias/categorias-new', component: CategoriasNewComponent },
  { path: 'categorias/categorias-edit', component: CategoriasEditComponent },
  { path: 'categorias/categorias-list', component: CategoriasListComponent },
];
