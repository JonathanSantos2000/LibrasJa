import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { CategoriasService } from '../../../../services/categorias.service';
import { User } from '../../../../shared/models/user.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SinaisService } from '../../../../services/sinais.service';
import { TextInputComponent } from '../../../partials/form/text-input/text-input.component';

@Component({
  imports: [TextInputComponent],
  selector: 'app-sinais-new',
  styleUrl: './sinais-new.component.css',
  templateUrl: './sinais-new.component.html',
})
export class SinaisNewComponent implements OnInit {
  sinaisForm!: FormGroup;
  categoriasForm!: FormGroup;
  user!: User;

  isSubmitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
    private userService: UserService,
    private sinaisService: SinaisService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.sinaisForm = this.formBuilder.group({
      SinTit: ['', [Validators.required, Validators.minLength(5)]],
      FurVlrIte: [, [Validators.required]],
      SinCatsSearch: [''],
      SinLink: [[], Validators.required],
      SinCats: [[], Validators.required],
    });

    this.categoriasForm = this.formBuilder.group({
      _Id: ['', Validators.required],
    });

    this.loadCategorias();
  }
  get fc() {
    return this.sinaisForm.controls;
  }

  get rc() {
    return this.categoriasForm.controls;
  }
  loadCategorias(): void {
    this.categoriasService.getAllCategorias().subscribe({
      next: (response) => {
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
      },
    });
  }
}
