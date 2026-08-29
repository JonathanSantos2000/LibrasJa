import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
const VALIDATORS_MESSAGES: any = {
  required: 'Não deveria estar vazio',
  email: 'E-mail não está correto',
  minlength: 'Deve conter no minimo 5 caracteres',
  notMatch: 'senhas não correspondem',
};
@Component({
  selector: 'app-input-validation',
  imports: [],
  standalone: true,
  styleUrl: './input-validation.component.css',
  templateUrl: './input-validation.component.html',
})
export class InputValidationComponent {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorWhen: boolean = true;

  errorMessages: string[] = [];
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    });
  }

  checkValidation() {
    const errors = this.control.errors;

    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map((key) => VALIDATORS_MESSAGES[key]);
  }
}
