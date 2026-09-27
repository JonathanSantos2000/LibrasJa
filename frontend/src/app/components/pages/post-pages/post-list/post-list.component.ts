import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Post } from '../../../../shared/models/post.models';
import { PostsService } from '../../../../services/post.service';
import { UserService } from '../../../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-posts-list',
  styleUrl: './post-list.component.css',
  templateUrl: './post-list.component.html',
})
export class PostListComponent implements OnInit {
  page = 1;
  totalPages = 1;
  posts: Post[] = [];

  constructor(
    private postsService: PostsService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postsService.GetPostsPaginated(this.page).subscribe((response) => {
      this.posts = response.posts;
      this.totalPages = response.totalPages;

      this.cdr.detectChanges();
    });
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadPosts();
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadPosts();
    }
  }
}
