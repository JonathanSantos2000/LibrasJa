import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
  LayoutModule,
} from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenuComponent,
    FooterComponent,
    LayoutModule,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  isMobile$: Observable<BreakpointState>;

  constructor(private breakpoint: BreakpointObserver) {
    this.isMobile$ = this.breakpoint.observe([Breakpoints.Handset]);
  }
}
