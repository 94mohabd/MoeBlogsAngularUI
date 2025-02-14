import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogpostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/components/image-selector/services/image.service';
@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  model: AddBlogPost;
  isImageSelectorVisible: boolean = false;
  categories$?: Observable<Category[]>;

  private addBlogPostSubscription?: Subscription;
  imageSelectSubscription?: Subscription;

  constructor(private blogPostService: BlogpostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
      next: (selectedImage) => {
        if (this.model) {
          this.model.featuredImageUrl = selectedImage.url;
          this.closeImageSelector();
        }
      }
    })
  }
  onFormSubmit(): void {
    this.addBlogPostSubscription = this.blogPostService.createBlogPost(this.model).subscribe({
      next: (response) => {
        console.log('Blog post added successfully', response);
        this.router.navigateByUrl('/admin/blogposts');
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
