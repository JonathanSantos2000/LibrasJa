import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TextInputComponent } from '../../../partials/form/text-input/text-input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../../shared/models/user.models';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { CategoriasService } from '../../../../services/categorias.service';

@Component({
  imports: [ReactiveFormsModule, TextInputComponent],
  standalone: true,
  selector: 'app-categorias-new',
  styleUrl: './categorias-new.component.css',
  templateUrl: './categorias-new.component.html',
})
export class CategoriasNewComponent implements OnInit {
  dataAtual = new Date();
  dataFormatada = this.dataAtual.toLocaleDateString('pt-BR');

  categoriasForm!: FormGroup;
  isSubmitted: boolean = false;
  user!: User;

  returnUrl: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private categoriasService: CategoriasService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.userService.user$.subscribe((newUser) => {
      this.user = newUser!;
    });
  }

  ngOnInit(): void {
    this.categoriasForm = this.formBuilder.group({
      categoria: ['', [Validators.required]],
    });
  }

  get fc() {
    return this.categoriasForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.categoriasForm.invalid) return;
    const fv = this.categoriasForm.value;

    const formData = new FormData();
    formData.append('CatNom', fv.categoria.toUpperCase());

    if (this.selectedFile) {
      formData.append('CatImg', this.selectedFile);
    }
    console.log(formData);

    this.categoriasService.CreateCategorias(formData).subscribe(() => {
      this.isSubmitted = false;
      this.categoriasForm.reset();
      this.imagePreview = null;
      this.selectedFile = {} as File;
    });
  }

  selectedFile!: File;

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
        this.cdr.detectChanges();
      };

      reader.readAsDataURL(file);
    }
  }
}
