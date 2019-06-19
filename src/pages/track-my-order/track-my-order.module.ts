import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackMyOrderPage } from './track-my-order';

@NgModule({
  declarations: [
    TrackMyOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackMyOrderPage),
  ],
  exports: [
    TrackMyOrderPage
  ]
})
export class TrackMyOrderPageModule {}
