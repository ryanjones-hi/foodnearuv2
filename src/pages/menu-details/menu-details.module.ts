import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuDetailsPage } from './menu-details';

@NgModule({
  declarations: [
    MenuDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuDetailsPage),
  ],
  exports: [
    MenuDetailsPage
  ]
})
export class MenuDetailsPageModule {}
