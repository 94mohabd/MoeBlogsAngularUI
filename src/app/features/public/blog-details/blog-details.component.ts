import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from '../../blog-post/services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  url: string | null = null;
  blogPost$?: Observable<BlogPost>;

  blogPostServiceSubscription?: Subscription

  constructor(private route: ActivatedRoute,
    private blogPostService: BlogpostService
  ) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.url = params.get('url');
      }
    });
    if (this.url) {
      this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
    }
  }
}
