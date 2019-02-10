import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from 'src/app/interfaces/image';

@Component({
  selector: 'app-image-with-tooltip',
  templateUrl: './image-with-tooltip.component.html',
  styleUrls: ['./image-with-tooltip.component.scss']
})
export class ImageWithTooltipComponent implements OnInit {

  @Input() image: Image;
  @Input() baseImage: string;
  @Input() width: string;
  @Input() pointer: string;
  @Input() showTooltion: boolean;
  @Output() showDetails = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  imageDetails(imageId) {
    this.showDetails.emit(imageId);
  }

}
