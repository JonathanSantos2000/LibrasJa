import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TextInputComponent } from '../../../partials/form/text-input/text-input.component';
import { IUserRegister } from '../../../../shared/interfaces/IUserRegister';
import { PasswordMatchValidator } from '../../../../shared/validators/password_match_validator';
import { UserService } from '../../../../services/user.service';

@Component({
  imports: [ReactiveFormsModule, TextInputComponent, RouterLink],
  standalone: true,
  selector: 'app-register-page',
  styleUrl: './register-page.component.css',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnInit {
  dataAtual = new Date();
  dataFormatada = this.dataAtual.toLocaleDateString('pt-BR');
  registerForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl: string = '';
  selectedFile!: File;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: PasswordMatchValidator('password', 'confirmPassword'),
      },
    );
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;

    const fv = this.registerForm.value;

    const formData = new FormData();

    formData.append('UsuNom', fv.name.toUpperCase());
    formData.append('UsuEmail', fv.email);
    formData.append('UsuSen', fv.password);
    formData.append('UsuSenCon', fv.confirmPassword);
    formData.append('UsuNivAce', '0');
    formData.append('UsuDatCad', this.dataFormatada);

    if (this.selectedFile) {
      formData.append('UsuImgPer', this.selectedFile);
    }

    this.userService.register(formData).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }

  imagePreview: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.selectedFile = file; // 🔥 ESSENCIAL

      // preview continua ok
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
}
