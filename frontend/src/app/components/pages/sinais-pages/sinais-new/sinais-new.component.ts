import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { CategoriasService } from '../../../../services/categorias.service';
import { User } from '../../../../shared/models/user.models';
import { FormGroup } from '@angular/forms';
import { SinaisService } from '../../../../services/sinais.service';

@Component({
  imports: [],
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
    private categoriasService: CategoriasService,
    private userService: UserService,
    private sinaisService: SinaisService
  ) {}

  ngOnInit(): void {
    // this.loadFurnitures();
  }
}
