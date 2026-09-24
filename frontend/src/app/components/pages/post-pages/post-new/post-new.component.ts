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
  user!: User;

  isSubmitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
    private userService: UserService,
    private postsService: PostsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.postsForm = this.formBuilder.group({
      PostTit: ['', [Validators.required, Validators.minLength(5)]],
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

  submit() {}

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
      (c) => c.CatNom === categoria.CatNom,
    );

    if (!alreadyExists) {
      selectedCategorias.push(categoria);
      this.fc['PostCats'].setValue(selectedCategorias);
    }

    (event.target as HTMLSelectElement).value = '';
  }

  removeCategoria(categoriaToRemove: any) {
    const categorias = this.fc['PostCats'].value.filter(
      (categoria: any) => categoria.CatNom !== categoriaToRemove.CatNom,
    );

    this.fc['PostCats'].setValue(categorias);
  }
}
