import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../models/blog-image.model';
import { UploadImageRequest } from '../models/upload-image.model';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileExtension: '',
    fileName: '',
    title: '',
    url: ''
  });


  constructor(private http: HttpClient) { }

  uploadImage(uploadImageRequest: UploadImageRequest): Observable<BlogImage> {
    const formData = new FormData();
    if (uploadImageRequest.file) {
      formData.append('File', uploadImageRequest.file);
    }
    formData.append('FileName', uploadImageRequest.fileName);
    formData.append('Title', uploadImageRequest.title);
    return this.http.post<BlogImage>(`${environment.apiBaseUrl}/api/images`, formData);
  }

  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}/api/images`);
  }

  selectImage(image: BlogImage): void {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}
