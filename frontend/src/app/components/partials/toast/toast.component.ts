import { Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast.service';

@Component({
  imports: [],
  selector: 'app-toast',
  standalone: true,
  styleUrl: './toast.component.css',
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);
}
