import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { CategoriasService } from '../../../../services/categorias.service';
import { Categorias } from '../../../../shared/models/categorias.models';

@Component({
  imports: [],
  selector: 'app-categorias-list',
  styleUrl: './categorias-list.component.css',
  templateUrl: './categorias-list.component.html',
})
export class CategoriasListComponent implements OnInit {
  page = 1;
  totalPages = 1;
  categorias: Categorias[] = [];
  constructor(
    private categoriasService: CategoriasService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  // Pagination properties

  loadCategorias() {
    this.categoriasService
      .getCategoriasPaginated(this.page)
      .subscribe((response) => {
        this.categorias = response.categorias;
        console.log(this.categorias);
        this.totalPages = response.totalPages;
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
