import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeHeroComponent } from '../home-hero/home-hero.component';
import { HomeSearchComponent } from '../home-search/home-search.component';
import { HomeCarrosselComponent } from '../home-carrossel/home-carrossel.component';
import { Categorias } from '../../../../shared/models/categorias.models';
import { CategoriasService } from '../../../../services/categorias.service';
import { ICarrosselHome } from '../../../../shared/interfaces/ICarrosselHome';
import { Post } from '../../../../shared/models/post.models';
import { PostsService } from '../../../../services/post.service';
import { HomeCommunityBannerComponent } from '../home-community-banner/home-community-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHeroComponent, HomeSearchComponent, HomeCarrosselComponent, HomeCommunityBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categorias: Categorias[] = [];
  carrosselCategorias: ICarrosselHome[] = [];

  constructor(
    private categoriasService: CategoriasService,
    private postsService: PostsService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.loadCategorias();
    this.loadPosts();
  }

  loadCategorias(): void {
    this.categoriasService.getAllCategorias().subscribe({
      next: (response) => {
        this.categorias = response;
        this.carrosselCategorias = this.categorias.map((categoria) => ({
          linkImagem: categoria.CatImg,
          titulo: categoria.CatNom,
          _id: categoria._id,
          link: '/posts/posts-list',
        }));
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
      },
    });
  }

  page = 1;
  totalPages = 1;

  posts: Post[] = [];
  carrosselPosts: ICarrosselHome[] = [];

  loadPosts(): void {
    this.postsService.GetPostsPaginated(this.page, {}).subscribe({
      next: (response) => {
        this.posts = response.posts;
        this.totalPages = response.totalPages;
        this.carrosselPosts = this.posts.map((post) => ({
          linkImagem: post.PostImg,
          titulo: post.PostTit,
          _id: post._id,
          link: '/posts/posts-list',
        }));
        console.log('Carrossel de posts carregado:', this.carrosselPosts);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar posts:', error);
        this.posts = [];
        this.totalPages = 1;
        this.cdr.detectChanges();
      },
    });
  }
}
