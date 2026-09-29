import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { PostsService } from '../../../../services/post.service';
import { Post } from '../../../../shared/models/post.models';
import { UPLOAD_IMAGE_URL } from '../../../../shared/constants/urls';
import { User } from '../../../../shared/models/user.models';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-post',
  imports: [DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  UPLOAD_IMAGE_URL = UPLOAD_IMAGE_URL + 'users/';

  post!: Post;
  user: User | null = null;
  isAuth = false;

  youtubeUrl!: SafeResourceUrl;

  constructor(
    private userService: UserService,
    private postService: PostsService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      this.isAuth = !!user;
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (!id) {
        return;
      }

      this.postService.GetPostId(id).subscribe({
        next: (post) => {
          this.post = post;

          this.youtubeUrl = this.createYoutubeUrl(post.PostLink);
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error('Erro ao buscar post:', error);
        },
      });
    });
  }

  private createYoutubeUrl(url: string): SafeResourceUrl {
    const videoUrl = new URL(url);

    let videoId: string | null = null;

    // Vídeo normal:
    // https://www.youtube.com/watch?v=XXXXXXXXXXX
    if (videoUrl.searchParams.has('v')) {
      videoId = videoUrl.searchParams.get('v');
    }

    // Short:
    // https://www.youtube.com/shorts/XXXXXXXXXXX
    if (videoUrl.pathname.startsWith('/shorts/')) {
      videoId = videoUrl.pathname.split('/shorts/')[1].split('/')[0];
    }

    if (!videoId) {
      throw new Error('URL do YouTube inválida.');
    }

    const embedUrl =
      `https://www.youtube.com/embed/${videoId}` +
      `?rel=0&playsinline=1&enablejsapi=1`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
