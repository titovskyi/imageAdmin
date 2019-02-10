import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';
import { Image } from 'src/app/interfaces/image';

@Component({
  selector: 'app-add-edit-image',
  templateUrl: './add-edit-image.component.html',
  styleUrls: ['./add-edit-image.component.scss']
})
export class AddEditImageComponent implements OnInit {
  imagesStore: Image[] = [];
  imageForm: FormGroup;
  baseImage: string | ArrayBuffer;

  currentImageId: number;
  currentImage: Image;

  constructor(
    private fb: FormBuilder,
    private imagesService: ImagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.currentImageId = params['id'];
    });

    this.imageForm = this.fb.group({
      image: ['', Validators.required],
      title: [null, Validators.required],
      positionTop: [null, Validators.required],
      positionLeft: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.imagesService.getImages().subscribe((value) => {
      if (value) {
        this.imagesStore = value;
      }
    });

    if (this.currentImageId) {
      this.imagesService.getImageById(this.currentImageId).subscribe( image => {
        this.baseImage = image.image;
        image.image = '';
        this.imageForm.patchValue(image);
        this.imageForm.get('image').clearValidators();
      });
    }
  }

  imageConvertToBase(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.baseImage = reader.result;
      };
    }
  }

  checkValue(value) {
    if (value === 'top') {
      if (this.imageForm.value.positionTop > 87) {
        this.imageForm.patchValue({
          positionTop: 87
        });
      } else if (this.imageForm.value.positionTop < 0) {
        this.imageForm.patchValue({
          positionTop: 0
        });
      }
    } else if (value === 'left') {
      if (this.imageForm.value.positionLeft > 60) {
        this.imageForm.patchValue({
          positionLeft: 60
        });
      } else if (this.imageForm.value.positionLeft < -10) {
        this.imageForm.patchValue({
          positionLeft: -10
        });
      }
    }
  }

  onSubmit() {
    if (this.currentImageId) {
      const submitedForm: Image = {
        ...this.currentImage,
        ...this.imageForm.value,
        image: this.baseImage,
        id: +this.currentImageId
      };
      this.imagesService.editImage(submitedForm);
    } else {

      const id = this.imagesStore.length ? this.imagesStore[this.imagesStore.length - 1].id + 1 : 1;
      const submitedForm: Image = {
        ...this.imageForm.value,
        image: this.baseImage,
        isHovered: false,
        id: id
      };
      this.imagesService.addImage(submitedForm);
    }
    this.router.navigate(['/all-images']);
  }
}
