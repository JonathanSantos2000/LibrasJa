import { Component, Input } from '@angular/core';
import { InputGroupComponent } from '../input-group/input-group.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  imports: [InputGroupComponent, InputValidationComponent, ReactiveFormsModule],
  standalone: true,
  selector: 'text-input',
  styleUrl: './text-input.component.css',
  templateUrl: './text-input.component.html',
})
export class TextInputComponent {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorWhen: boolean = true;
  @Input()
  label!: string;
  @Input()
  type: 'text' | 'password' | 'email' | 'number' = 'text';
  @Input()
  customClass: string = '';

  get formControl() {
    return this.control as FormControl;
  }
}
