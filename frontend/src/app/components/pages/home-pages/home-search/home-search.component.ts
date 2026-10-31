import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'app-home-search',
  styleUrl: './home-search.component.css',
  templateUrl: './home-search.component.html',
})
export class HomeSearchComponent {
  constructor(private router: Router) {}

  searchTerm = '';

  searchPosts(): void {
    const term = this.searchTerm.trim();

    if (!term) {
      return;
    }

    this.router.navigate(['/posts/posts-list'], {
      queryParams: { q: term },
    });
  }
}
