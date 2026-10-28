import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { Post } from '../../../../shared/models/post.models';
import { PostsService } from '../../../../services/post.service';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  styleUrl: './post-list.component.css',
  templateUrl: './post-list.component.html',
})
export class PostListComponent implements OnInit, OnDestroy {
  page = 1;
  totalPages = 1;

  posts: Post[] = [];

  searchTerm = '';
  authorFilter = '';
  categoryFilter = '';

  private routeSubscription?: Subscription;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('q') ?? '';
      this.authorFilter = params.get('autor') ?? '';
      this.categoryFilter = params.get('categoria') ?? '';

      this.page = 1;
      this.loadPosts();
    });
  }

  loadPosts(): void {
    this.postsService
      .GetPostsPaginated(this.page, {
        q: this.searchTerm,
        autor: this.authorFilter,
        categoria: this.categoryFilter,
      })
      .subscribe({
        next: (response) => {
          this.posts = response.posts;
          this.totalPages = response.totalPages;
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

  applyFilters(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q: this.searchTerm.trim() || null,
        autor: this.authorFilter.trim() || null,
        categoria: this.categoryFilter.trim() || null,
      },
      queryParamsHandling: 'merge',
    });
  }

  clearFilters(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q: null,
        autor: null,
        categoria: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadPosts();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadPosts();
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  showFilters = false;

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
}
