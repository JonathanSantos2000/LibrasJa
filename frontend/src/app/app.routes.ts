import { Routes } from '@angular/router';
import { RegisterPageComponent } from './components/pages/auth/register-page/register-page.component';
import { LoginPageComponent } from './components/pages/auth/login-page/login-page.component';

export const routes: Routes = [
  /* { path: '', component: HomeComponent }, */

  { path: 'auth/registro', component: RegisterPageComponent },
  { path: 'auth/login', component: LoginPageComponent },
];
