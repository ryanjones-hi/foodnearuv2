import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectAreaPage } from './select-area';

@NgModule({
  declarations: [
    SelectAreaPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectAreaPage),
  ],
  exports: [
    SelectAreaPage
  ]
})
export class SelectAreaPageModule {}
