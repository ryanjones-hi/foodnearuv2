import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResLandingPage } from './res-landing';

@NgModule({
  declarations: [
    ResLandingPage,
  ],
  imports: [
    IonicPageModule.forChild(ResLandingPage),
  ],
  exports: [
    ResLandingPage
  ]
})
export class ResLandingPageModule {}
