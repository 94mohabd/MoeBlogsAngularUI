import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blog-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../models/blog-post.model';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { UpdateBlogPostRequest } from '../models/update-blog-post.model';
import { ImageService } from 'src/app/shared/components/image-selector/services/image.service';
@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorVisible: boolean = false;

  routeSubscription?: Subscription;
  blogPostSubscription?: Subscription;
  editBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  imageSelectSubscription?: Subscription;

  constructor(private route: ActivatedRoute,
    private blogPostService: BlogpostService,
    private categoryService: CategoryService,
    private router: Router,
    private imageService: ImageService) { }


  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.blogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCategories = response.categories.map((category) => category.id);
            },
            error: (error) => {
              console.log(error);
            }
          });
        }

        this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
          next: (selectedImage) => {
            if (this.model) {
              this.model.featuredImageUrl = selectedImage.url;
              this.closeImageSelector();
            }
          }
        })
      }
    })
  }

  onFormSubmit(): void {
    if (this.model && this.id) {
      const updateBlogPostRequest: UpdateBlogPostRequest = {
        title: this.model.title,
        shortDescription: this.model.shortDescription,
        content: this.model.content,
        featuredImageUrl: this.model.featuredImageUrl,
        urlHandle: this.model.urlHandle,
        author: this.model.author,
        publishedDate: this.model.publishedDate,
        isVisible: this.model.isVisible,
        categories: this.selectedCategories ?? []
      };

      this.editBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPostRequest).subscribe({
        next: (response) => {
          console.log("edit was successful!", response);
          this.router.navigateByUrl('/admin/blogposts');
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  onDelete(): void {
    if (this.id) {
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id).subscribe({
        next: (response) => {
          console.log("deleted", response)
          this.router.navigateByUrl('/admin/blogposts')
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.blogPostSubscription?.unsubscribe();
    this.editBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
