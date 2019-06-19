import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderOnlinePage } from './order-online';

@NgModule({
  declarations: [
    OrderOnlinePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderOnlinePage),
  ],
  exports: [
    OrderOnlinePage
  ]
})
export class OrderOnlinePageModule {}
