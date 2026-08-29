import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-input',
  styleUrl: './input-group.component.css',
  templateUrl: './input-group.component.html',
})
export class InputGroupComponent {
  @Input()
  label!: string;
  @Input()
  bgColor: string = 'none';
  @Input()
  exibir_label: number = 0;
  @Input()
  customClass: string = '';
}
