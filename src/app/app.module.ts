import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddEditImageComponent } from './components/add-edit-image/add-edit-image.component';
import { AllImagesComponent } from './components/all-images/all-images.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsImageComponent } from './components/details-image/details-image.component';
import { ImageWithTooltipComponent } from './components/image-with-tooltip/image-with-tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEditImageComponent,
    AllImagesComponent,
    DetailsImageComponent,
    ImageWithTooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
