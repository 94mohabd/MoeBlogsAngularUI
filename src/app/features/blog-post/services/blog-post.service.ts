import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPost } from '../models/blog-post.model';
import { UpdateBlogPostRequest } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http: HttpClient) { }


  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }

  getBlogPostByUrlHandle(urlHandle: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${urlHandle}`);
  }

  createBlogPost(model: AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/blogposts?addAuth=true`, model);
  }

  updateBlogPost(id: string, updateBlogPostRequest: UpdateBlogPostRequest): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`, updateBlogPostRequest);
  }

  deleteBlogPost(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`);
  }
}
