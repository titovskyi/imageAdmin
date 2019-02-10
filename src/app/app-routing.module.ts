import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllImagesComponent } from './components/all-images/all-images.component';
import { AddEditImageComponent } from './components/add-edit-image/add-edit-image.component';
import { DetailsImageComponent } from './components/details-image/details-image.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-images', pathMatch: 'full'},
  {path: 'all-images', component: AllImagesComponent},
  {path: 'details/:id', component: DetailsImageComponent},
  {path: 'add-image', component: AddEditImageComponent},
  {path: 'edit-image/:id', component: AddEditImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
