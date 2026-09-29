import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { CategoriasService } from '../../../../services/categorias.service';
import { User } from '../../../../shared/models/user.models';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostsService } from '../../../../services/post.service';
import { TextInputComponent } from '../../../partials/form/text-input/text-input.component';
import { CommonModule } from '@angular/common';
import { Categorias } from '../../../../shared/models/categorias.models';
import { Observable } from 'rxjs';

@Component({
  imports: [TextInputComponent, ReactiveFormsModule, CommonModule],
  standalone: true,
  selector: 'app-post-new',
  styleUrl: './post-new.component.css',
  templateUrl: './post-new.component.html',
})
export class PostNewComponent implements OnInit {
  postsForm!: FormGroup;
  categoriasForm!: FormGroup;
  user: User | null = null;

  isSubmitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
    private userService: UserService,
    private postsService: PostsService,
    private cdr: ChangeDetectorRef,
  ) {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.postsForm = this.formBuilder.group({
      PostTit: ['', [Validators.required, Validators.minLength(4)]],
      PostDes: ['', [Validators.required, Validators.minLength(10)]],
      PostLink: ['', [Validators.required, Validators.minLength(10)]],
      PostCatsSearch: [''],
      PostCats: [[], Validators.required],
    });

    this.categoriasForm = this.formBuilder.group({
      _Id: ['', Validators.required],
    });

    this.getAllCategorias();
  }
  get fc() {
    return this.postsForm.controls;
  }

  get ct() {
    return this.categoriasForm.controls;
  }

  submit() {
    this.isSubmitted = true;

    if (this.postsForm.invalid) {
      return;
    }

    if (!this.user?._id) {
      console.error('Usuário não autenticado.');
      return;
    }

    const formData = new FormData();

    formData.append('PostTit', this.fc['PostTit'].value);
    formData.append('PostDes', this.fc['PostDes'].value);
    formData.append('PostLink', this.fc['PostLink'].value);
    formData.append('PostAut', this.user._id);
    formData.append('PostAutNom', this.user.UsuNom);

    formData.append(
      'PostCats',
      JSON.stringify(
        this.fc['PostCats'].value.map((categoria: Categorias) => ({
          PostCatId: categoria._id,
          PostCatNom: categoria.CatNom,
        })),
      ),
    );

    if (this.selectedFile) {
      formData.append('PostImg', this.selectedFile);
    }

    this.postsService.CreatePost(formData).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.postsForm.reset();
        this.categoriasForm.reset();
        this.selectedCategoria = {} as Categorias;
        this.imagePreview = null;
        this.selectedFile = {} as File;
      },
    });
  }

  // ---- categorias search ----
  categorias: Categorias[] = [];
  categoriaName: string = '';
  categoriasFiltered: Categorias[] = [];
  selectedCategoria!: Categorias;

  getAllCategorias() {
    let categoriasObservalbe: Observable<Categorias[]>;
    categoriasObservalbe = this.categoriasService.getAllCategorias();

    categoriasObservalbe.subscribe((serverCategorias) => {
      this.categorias = serverCategorias;
      this.categoriasFiltered = serverCategorias;
      this.cdr.detectChanges();
    });
  }

  buscarItensPorNome() {
    const parteNome = this.fc['PostCatsSearch'].value;
    const regex = new RegExp(parteNome, 'i');
    this.categoriasFiltered = this.categorias.filter((categoria) =>
      regex.test(categoria.CatNom),
    );
    this.fc['PostCatsSearch'].setValue('');
  }

  onCategoriaSelect(event: any) {
    const categoriaName = (event.target as HTMLSelectElement).value;

    if (!categoriaName) return;

    const categoria = this.categorias.find((c) => c.CatNom === categoriaName);

    if (!categoria) return;

    const selectedCategorias = [...this.fc['PostCats'].value];

    const alreadyExists = selectedCategorias.some(
      (c) => c._id === categoria._id,
    );

    if (!alreadyExists) {
      selectedCategorias.push(categoria);
      this.fc['PostCats'].setValue(selectedCategorias);
    }

    // Limpa a busca
    this.fc['PostCatsSearch'].setValue('');

    // Mostra novamente todas, menos as selecionadas
    this.atualizarCategoriasFiltered();

    // Reseta o select
    (event.target as HTMLSelectElement).value = '';
  }

  removeCategoria(categoriaToRemove: Categorias) {
    const categorias = this.fc['PostCats'].value.filter(
      (categoria: Categorias) => categoria._id !== categoriaToRemove._id,
    );

    this.fc['PostCats'].setValue(categorias);

    this.atualizarCategoriasFiltered();
  }

  atualizarCategoriasFiltered() {
    const selecionadas = this.fc['PostCats'].value as Categorias[];

    this.categoriasFiltered = this.categorias.filter(
      (categoria) =>
        !selecionadas.some((selecionada) => selecionada._id === categoria._id),
    );
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
