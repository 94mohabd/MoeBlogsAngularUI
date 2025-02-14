import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../services/category.service';
import { UpdateCategoryRequest } from '../../category/models/update-category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  deleteCategorySubscription?: Subscription;
  category?: Category;

  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.categoryService.getCategoryById(this.id).subscribe({
            next: (response) => {
              this.category = response;
            }
          })

        }
      }
    });
  }

  onFormSubmit(): void {
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
    };

    if (this.id) {
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest).subscribe({
        next: (response) => {
          console.log("edit was successful!", response);
          this.router.navigateByUrl('/admin/categories');
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  onDelete(): void {
    if (this.id) {
      this.deleteCategorySubscription = this.categoryService.deleteCategory(this.id).subscribe({
        next: (response) => {
          console.log("onDelete was successful!", response);
          this.router.navigateByUrl('/admin/categories');
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
    this.deleteCategorySubscription?.unsubscribe();
  }
}
