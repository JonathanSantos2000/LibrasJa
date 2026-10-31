import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CategoriasService } from '../../../../services/categorias.service';
import { Categorias } from '../../../../shared/models/categorias.models';
import { RouterLink } from '@angular/router';
import { ICarrosselHome } from '../../../../shared/interfaces/ICarrosselHome';

@Component({
  imports: [RouterLink],
  selector: 'app-home-carrossel',
  styleUrl: './home-carrossel.component.css',
  templateUrl: './home-carrossel.component.html',
})
export class HomeCarrosselComponent implements OnInit {
  @Input()
  kicker!: string;
  @Input()
  titulo!: string;
  @Input()
  VerTodas!: string;
  @Input()
  carrossel!: ICarrosselHome[];
  @Input()
  queryParams!: string;

  getQueryParams(valor: string) {
    return {
      [this.queryParams]: valor,
    };
  }
  termoBusca = '';

  categorias: Categorias[] = [];
  constructor(
    private categoriasService: CategoriasService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriasService.getAllCategorias().subscribe({
      next: (response) => {
        this.categorias = response;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
      },
    });
  }

  @ViewChild('carrosselTrack')
  carrosselTrack!: ElementRef<HTMLDivElement>;

  avancar(): void {
    const track = this.carrosselTrack?.nativeElement;
    if (!track) return;

    const primeiroItem = track.firstElementChild as HTMLElement;
    if (!primeiroItem) return;

    const larguraItem =
      primeiroItem.offsetWidth +
      parseFloat(getComputedStyle(track).columnGap || '0');

    const maxScroll = track.scrollWidth - track.clientWidth;

    if (track.scrollLeft >= maxScroll - 5) {
      // Chegou ao final: retorna ao início
      track.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    } else {
      // Continua avançando
      track.scrollBy({
        left: larguraItem,
        behavior: 'smooth',
      });
    }
  }

  voltar(): void {
    const track = this.carrosselTrack?.nativeElement;
    if (!track) return;

    const primeiroItem = track.firstElementChild as HTMLElement;
    if (!primeiroItem) return;

    const larguraItem =
      primeiroItem.offsetWidth +
      parseFloat(getComputedStyle(track).columnGap || '0');

    if (track.scrollLeft <= 5) {
      track.scrollTo({
        left: track.scrollWidth - track.clientWidth,
        behavior: 'smooth',
      });
    } else {
      track.scrollBy({
        left: -larguraItem,
        behavior: 'smooth',
      });
    }
  }
}
