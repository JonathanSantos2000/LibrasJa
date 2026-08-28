import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';

import { Observable } from 'rxjs';

import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { ToastComponent } from "../toast/toast.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuComponent, FooterComponent, ToastComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  isMobile$: Observable<BreakpointState>;

  constructor(private breakpoint: BreakpointObserver) {
    this.isMobile$ = this.breakpoint.observe([Breakpoints.Handset]);
  }
}
