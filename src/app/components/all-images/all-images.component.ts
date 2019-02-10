import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { Image } from 'src/app/interfaces/image';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.scss']
})
export class AllImagesComponent implements OnInit {

  images: Image[];

  constructor(
    private imagesService: ImagesService,
    private router: Router) {}

  ngOnInit() {
    this.imagesService.getImages().subscribe((value) => {
      this.images = value;
    });
    console.log(this.images);
  }

  showDetails(imageId) {
    this.router.navigate([`/details/${imageId}`]);
  }

  editImage(imageId) {
    this.router.navigate([`/edit-image/${imageId}`]);
  }

  deleteImage(imageId) {
    console.log(imageId, 'ID');
    this.imagesService.deleteImage(imageId).subscribe(data => {
      this.images = data;
    });
  }

}
