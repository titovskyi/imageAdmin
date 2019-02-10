import { Injectable } from '@angular/core';
import { Image } from '../interfaces/image';
import { HttpClient } from '@angular/common/http';
import {  of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  url: string = null;
  localStorageImages: Image[];

  constructor(private http: HttpClient) { }

  getImages(): Observable<Image[]> {
    if (this.url) {
      return this.http.get<Image[]>(this.url);
    }

    return of(JSON.parse(localStorage.getItem('images')));
  }

  getImageById(id: number): Observable<Image> {
    if (this.url) {
      return this.http.get<Image>(this.url + id);
    }
    return of(JSON.parse(localStorage.getItem('images')).find((image) => image.id === +id));
  }

  addImage(image: Image) {
    if (this.url) {
      return this.http.post(this.url, image);
    }

    const imagesStore = JSON.parse(localStorage.getItem('images')) || [];
    imagesStore.push(image);

    localStorage.setItem('images', JSON.stringify(imagesStore));
  }

  editImage(image: Image) {
    if (this.url) {
      return this.http.put(this.url + '/' + image.id, image);
    }
    const imagesStore = JSON.parse(localStorage.getItem('images'));
    const editedImageIndex = imagesStore.findIndex((item) => item.id === image.id);
    const currentImage = {...imagesStore[editedImageIndex], ...image};
    imagesStore[editedImageIndex] = currentImage;
    localStorage.setItem('images', JSON.stringify(imagesStore));

  }

  deleteImage(id: number): Observable<Image[]> {
    if (this.url) {
      return this.http.delete<Image[]>(this.url + id);
    }

    const allimages = JSON.parse(localStorage.getItem('images')).filter((image) => image.id !== id);
    localStorage.setItem('images', JSON.stringify(allimages));
    return of(JSON.parse(localStorage.getItem('images')));
  }
}
