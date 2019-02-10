import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/interfaces/image';

@Component({
  selector: 'app-details-image',
  templateUrl: './details-image.component.html',
  styleUrls: ['./details-image.component.scss']
})
export class DetailsImageComponent implements OnInit {

  currentImageId: number;
  currentImage: Image;

  constructor(
    private imagesService: ImagesService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.currentImageId = params['id'];
      console.log(this.currentImageId);
    });
  }



  ngOnInit() {
    this.imagesService.getImageById(this.currentImageId).subscribe( image => {
      this.currentImage = image;
    });
  }

}
