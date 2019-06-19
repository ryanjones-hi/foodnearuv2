import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckOutPage } from './check-out';

@NgModule({
  declarations: [
    CheckOutPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckOutPage),
  ],
  exports: [
    CheckOutPage
  ]
})
export class CheckOutPageModule {}
