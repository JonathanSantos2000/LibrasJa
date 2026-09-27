import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { PostsService } from '../../../../services/post.service';
import { Post } from '../../../../shared/models/post.models';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  post!: Post;

  youtubeUrl!: SafeResourceUrl;

  constructor(
    private postService: PostsService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
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
