import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadImageRequest } from './models/upload-image.model';
import { ImageService } from './services/image.service';
import { BlogImage } from './models/blog-image.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {
  model: UploadImageRequest;

  images$?: Observable<BlogImage[]>;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm

  constructor(private imageService: ImageService) {
    this.model = {
      fileName: '',
      title: ''
    }
  }

  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (this.model) {
      this.model.file = element.files?.[0];
    }
  }

  uploadImage(): void {
    this.imageService.uploadImage(this.model).subscribe({
      next: (response) => {
        console.log("image uploaded ", response);
        this.imageUploadForm?.resetForm();
        this.getImages();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  selectImage(image: BlogImage): void {
    this.imageService.selectImage(image);
  }

  private getImages() {
    this.images$ = this.imageService.getAllImages();
  }
}
