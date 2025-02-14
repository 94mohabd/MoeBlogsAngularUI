import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { BlogpostService } from '../services/blog-post.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogPostListComponent implements OnInit {

  blogPosts$?: Observable<BlogPost[]>;

  constructor(private blogPostService: BlogpostService) { }

  ngOnInit(): void {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }

}
