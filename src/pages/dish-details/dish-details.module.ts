import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DishDetailsPage } from './dish-details';

@NgModule({
  declarations: [
    DishDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DishDetailsPage),
  ],
  exports: [
    DishDetailsPage
  ]
})
export class DishDetailsPageModule {}
