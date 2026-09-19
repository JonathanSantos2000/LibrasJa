import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { CategoriasService } from '../../../../services/categorias.service';
import { Categorias } from '../../../../shared/models/categorias.models';
import { UPLOAD_IMAGE_URL } from '../../../../shared/constants/urls';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-categorias-list',
  styleUrl: './categorias-list.component.css',
  templateUrl: './categorias-list.component.html',
})
export class CategoriasListComponent implements OnInit {
  UPLOAD_IMAGE_URL = UPLOAD_IMAGE_URL + 'categorias/';
  page = 1;
  totalPages = 1;
  categorias: Categorias[] = [];
  constructor(
    private categoriasService: CategoriasService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  // Pagination properties

  loadCategorias(): void {
    this.categoriasService.getCategoriasPaginated(this.page).subscribe({
      next: (response) => {
        this.categorias = response.categorias;
        this.totalPages = response.totalPages;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
      },
    });
  }
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadCategorias();
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadCategorias();
    }
  }
}
